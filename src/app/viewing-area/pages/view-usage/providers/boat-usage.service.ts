import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { UsageInfo, UsageInfoID } from "../../../../core/objects/usageInfo";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class BoatUsageService {
  private offset = new Date();

  public pageIndex = 0;
  public currentSelectedUsages: BehaviorSubject<UsageInfoID[]> =
    new BehaviorSubject(null);
  private previousUsageSet: any[] = [];
  public batch_size: number = 20;

  constructor(private db: AngularFirestore) {
    this.getBatch().subscribe((val) => {
      this.currentSelectedUsages.next(val);
    });
  }

  forwardBatch(offsetPos) {
    this.pageIndex++;
    this.offset = this.currentSelectedUsages.getValue()[offsetPos].endTime;
    this.previousRecord();

    this.getBatch().subscribe((val) => {
      this.currentSelectedUsages.next(val);
    });
  }

  backBatch(offsetPos) {
    this.pageIndex--;
    this.offset = this.previousUsageSet.pop().usage[0].endTime;
    this.getPreviousBatch().subscribe((val) => {
      this.currentSelectedUsages.next(val);
    });
  }

  updateBatch(batch_size) {
    this.pageIndex = 0;
    this.batch_size = batch_size;
    this.offset = new Date();
    this.previousUsageSet = [];
    this.getBatch().subscribe((val) => {
      this.currentSelectedUsages.next(val);
    });
  }


  /* Get a the next set of usage data from DB */
  getBatch() {
    return this.db
      .collection<UsageInfo>("/boatUsage", (ref) =>
        ref
          .orderBy("endTime", "desc")
          .startAfter(this.offset)
          .limit(this.batch_size)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as UsageInfo;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  /* Get the previous set of usage data from DB */
  getPreviousBatch() {
    return this.db
      .collection<UsageInfo>("/boatUsage", (ref) =>
        ref
          .orderBy("endTime", "desc")
          .startAt(this.offset)
          .limit(this.batch_size)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as UsageInfo;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  private previousRecord() {
    /* Only add to previous list if the item is not already the previous one */
    if (
      this.previousUsageSet[this.previousUsageSet.length - 1] !==
      this.currentSelectedUsages.getValue()
    ) {
      this.previousUsageSet.push({
        usage: this.currentSelectedUsages.getValue(),
      });
    }
  }
}
