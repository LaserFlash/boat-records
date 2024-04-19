import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenticationService {

  public authState: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isAdmin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isSystemAdmin: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(async (data) => {
      if (!data) {
        this.isAdmin.next(false);
        this.isSystemAdmin.next(false);
        this.authState.next(false);
      }


      (await this.afAuth.currentUser).getIdTokenResult().then((idTokenResult) => {
        this.authState.next(true); // Is now authenticated     

        if (!!idTokenResult.claims.admin) {
          this.isAdmin.next(true);
        }

        if (!!idTokenResult.claims.systemAdmin) {
          this.isSystemAdmin.next(true);
        }

      }).catch(() => {
        this.isAdmin.next(false);
        this.isSystemAdmin.next(false);
      });

    });
  }

  /* Logout the current user */
  public logout() {
    this.isAdmin.next(false);
    this.isSystemAdmin.next(false);
    this.authState.next(false);

    this.afAuth.signOut();
  }
}
