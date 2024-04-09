import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentAreaRoutingModule } from './document-area-routing.module';
import { DocumentAreaComponent } from './document-area.component';

/* Import the sub-pages */
import { SafetyDocsComponent } from './pages/safety-docs/safety-docs.component';

/* Import Services/Providers */
import { SafetyDocsService } from './shared/safety-docs/safety-docs.service';
import { AuthenticationService } from '../core/auth/authentication.service';

/* Import reusable UI */
import { InlineEditInputComponent } from '../ui/inline-edit-input/inline-edit-input.component';

/* Import Material2 things */
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { MatSnackBar } from '@angular/material/snack-bar';

import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [DocumentAreaComponent, SafetyDocsComponent, InlineEditInputComponent],
  imports: [
    CommonModule,
    DocumentAreaRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  providers: [AuthenticationService, SafetyDocsService, MatSnackBar],
})
export class DocumentAreaModule {}
