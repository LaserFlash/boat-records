import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Import Building components */
import { BreakageCardComponent } from './breakage-card.component';
import { ModalModule } from '../modal/modal.module';
import { ModalService } from '../modal/modal.service';
import { ImportanceConversionHelper } from '../../core/constants/menu-names/nameConversion';

import { SharedServicesModule } from '../../core/shared-services.module';

/* Import Material2 */
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    BreakageCardComponent,
  ],
  imports: [
    CommonModule,
    ModalModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    SharedServicesModule

  ],
  providers: [
    ModalService,
    ImportanceConversionHelper
  ],
  exports: [
    BreakageCardComponent
  ],
})
export class BreakageCardModule { }
