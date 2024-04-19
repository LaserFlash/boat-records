import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { UsageInfo, UsageInfoID } from "../../../../core/objects/usageInfo";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class BoatUsageService {
  public pageIndex = 0;
  public currentSelectedUsages: BehaviorSubject<UsageInfoID[]> = new BehaviorSubject(null);
  public batch_size: number = 20;

  private offset = new Date();
  private previousUsageSet: any[] = [];

  constructor(private db: AngularFirestore) {
    this.getBatch().subscribe((val) => this.currentSelectedUsages.next(val));
  }

  forwardBatch(offsetPos) {
    this.pageIndex++;
    this.offset = this.currentSelectedUsages.getValue()[offsetPos].endTime;
    this.previousRecord();
    this.getBatch().subscribe((val) => this.currentSelectedUsages.next(val));
  }

  backBatch() {
    this.pageIndex--;
    this.offset = this.previousUsageSet.pop().usage[0].endTime;
    this.getPreviousBatch().subscribe((val) => this.currentSelectedUsages.next(val));
  }

  updateBatch(batch_size) {
    this.pageIndex = 0;
    this.batch_size = batch_size;
    this.offset = new Date();
    this.previousUsageSet = [];
    this.getBatch().subscribe((val) => this.currentSelectedUsages.next(val));
  }


  /* Get a the next set of usage data from DB */
  getBatch() {
    return this.db
      .collection<UsageInfo>("/boatUsage", (ref) =>
        ref
          .where('deletedAt', '==', null)
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
          .where('deletedAt', '==', null)
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
      this.previousUsageSet.push({ usage: this.currentSelectedUsages.getValue() });
    }
  }


  /**
   * Mark a usage document as deleted without removing it from the database  
   * - set deletedAt to current datetime
   */
  public deleteUsage(usage: UsageInfoID) {
    this.db.collection<UsageInfo>("/boatUsage").doc(usage.id).update({ 'deletedAt': new Date() })
  }
}
