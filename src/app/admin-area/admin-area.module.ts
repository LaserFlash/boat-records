import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAreaRoutingModule } from './admin-area-routing.module';
import { AdminComponent } from './admin.component';

import { ModifyBoatsComponent } from './components/modify-boats/modify-boats.component';
import { ElevateUserComponent } from './components/elevate-user/elevate-user.component';
import { RunMigrationsComponent } from './components/run-migrations/run-migrations.component';
import { InlineEditInputBoatsComponent } from './components/modify-boats/inline-edit-input-boats/inline-edit-input-boats.component';

/* Import Material2 Things */
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    ModifyBoatsComponent,
    ElevateUserComponent,
    RunMigrationsComponent,
    InlineEditInputBoatsComponent
  ],
  imports: [
    CommonModule,
    AdminAreaRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [
    MatSnackBar
  ]
})
export class AdminAreaModule { }
