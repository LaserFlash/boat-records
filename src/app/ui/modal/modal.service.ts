import { Observable } from 'rxjs';
import { ConfirmModalComponent } from './modal-confirm.component';
import { ImageModalComponent } from './modal-image.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  constructor(private dialog: MatDialog) { }
  public confirm(title: string, message: string, button: string): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmModalComponent>;
    dialogRef = this.dialog.open(ConfirmModalComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.button = button;
    return dialogRef.afterClosed();
  }
  public imageModal(imageURL: string): Observable<boolean> {
    let dialogRef: MatDialogRef<ImageModalComponent>;
    dialogRef = this.dialog.open(ImageModalComponent);
    dialogRef.componentInstance.imageURL = imageURL;
    return dialogRef.afterClosed();
  }
}
