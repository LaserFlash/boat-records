import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import addDefaultValueForField from '../../../../scripts/migrate-doc'
import { AuthenticationService } from '../../../core/auth/authentication.service';


type MigrationDoc = { name: string, createdAt: number };

@Component({ selector: 'run-migrations', templateUrl: './run-migrations.component.html' })
export class RunMigrationsComponent implements OnInit {
  protected canRunMigrations = false;

  /** Build a list of migrations needed to keep the system happy */
  protected migrations = [
    {
      name: 'Add /boatUsage - deletedAt = null', lastRun: undefined,
      migrate: () => addDefaultValueForField(this.db, '/boatUsage', "deletedAt", null, Infinity)
    }
  ]

  constructor(private Auth: AuthenticationService, private snackBar: MatSnackBar, private db: AngularFirestore) { }

  ngOnInit() {
    this.Auth.isSystemAdmin.subscribe(isSystemAdmin => this.canRunMigrations = isSystemAdmin);
    this.getPastMigrations();
  }

  /**
   * Check if any mogrations have already been run, and update the UI accordingly
   */
  private getPastMigrations() {
    this.db.collection<MigrationDoc>
      ('/migrations', (query) => query.orderBy('createdAt'))
      .get()
      .subscribe((repsonse => repsonse.docs.forEach
        (migration => {
          const record = migration.data();
          const migrationRecord = this.migrations.find(({ name }) => name === record.name);

          if (migrationRecord) {
            migrationRecord.lastRun = record.createdAt
          }
        })
      ))
  }

  /**
   * Runs a given migration  
   * 
   * Side effects:
   *  - Adds record to /migrations tracking the run
   *  - Updates local migration list on success
   */
  protected runMigration(migration) {
    console.info("Running migration", migration.name);

    migration.migrate()
      .then(() => {
        this.snackBar.open('Ran applicable migrations', 'close', { duration: 3000 });
        this.db.collection<MigrationDoc>('/migrations').add({ name: migration.name, createdAt: Date.now() })
      })
      .catch(() => this.snackBar.open('Migrations failed', 'close', { duration: 3000 }))
      .finally(() => this.getPastMigrations());
  }
}
