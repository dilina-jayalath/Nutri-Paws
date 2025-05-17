import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InventoryService } from '../../inventory/inventory.service';

@Component({
  selector: 'app-sup-alert',
  templateUrl: './sup-alert.component.html',
  styleUrls: ['./sup-alert.component.scss'],
})
export class SupAlertComponent {
  displayedColumns: string[] = [
    'orderId',
    'itemCount',
    'mobile',
    'price',
    'action',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<SupAlertComponent>
  ) {}

  onView() {
    this.router.navigate(['/own-supplier-orders']);
  }
}
