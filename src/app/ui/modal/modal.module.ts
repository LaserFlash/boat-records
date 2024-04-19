import { ModalService } from './modal.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';

import { ConfirmModalComponent } from './modal-confirm.component';
import { ImageModalComponent } from './modal-image.component';

@NgModule({
    imports: [
        MatDialogModule,
        MatButtonModule,
    ],
    exports: [
        ConfirmModalComponent,
        ImageModalComponent,
    ],
    declarations: [
        ConfirmModalComponent,
        ImageModalComponent,
    ],
    providers: [
        ModalService,
    ]
})
export class ModalModule { }
