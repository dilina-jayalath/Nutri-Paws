import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SupplierItem } from '../supplier-view/supplier-view.component';

@Component({
  selector: 'app-view-item-dialog',
  templateUrl: './view-item-dialog.component.html',
  styleUrls: ['./view-item-dialog.component.scss']
})
export class ViewItemDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SupplierItem
  ) {}
}
