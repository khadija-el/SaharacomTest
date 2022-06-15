import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(public dialog: MatDialog) { }

  openDialog(model: string) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '750px',
      disableClose: true,
      data: { model }
    });

    return dialogRef.afterClosed();
  }
}
