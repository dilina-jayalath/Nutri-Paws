import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InventoryService } from '../../inventory.service';
import { UpdateStockComponent } from '../update-stock/update-stock.component';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent {

  displayedColumns: string[] = ['itemId', 'itemName', 'stock', 'action'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,  public dialog: MatDialog, private router: Router, private api: InventoryService, public dialogRef: MatDialogRef<NotificationDialogComponent>) {}

  onUpdate(item: any){
    this.dialog.open(UpdateStockComponent, {
      width: '400px',
      data:item
    }).afterClosed().subscribe(result => {
        this.dialogRef.close();
    });
  }

}
