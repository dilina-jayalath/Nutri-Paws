import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InventoryService } from '../../inventory/inventory.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-payments',
  templateUrl: './supplier-payments.component.html',
  styleUrls: ['./supplier-payments.component.scss'],
})
export class SupplierPaymentsComponent {
  constructor(
    private fb: FormBuilder,
    private api: InventoryService,
    public dialog: MatDialog
  ) {}

  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }

  onAddItem() {}

  // TABLE COLUMS NAME DEFINE
  displayedColumns: string[] = [
    'orderId',
    'address',
    'mobile',
    'price',
    'status',
  ];

  statusOptions: string[] = ['Paid'];

  // Sample data for orders
  orders: any[] = [];
  orderItems: any[] = [];

  ngOnInit(): void {
    this.getCustomerPayments();
  }

  getCustomerPayments() {
    this.api.getSupplierPayments(1).subscribe({
      next: (response: any) => {
        this.orders = response;
        console.log('xxx' + JSON.stringify(this.orders));
      },
      error: (error: any) => {
        Swal.fire('Error While Report Data');
      },
    });
  }

  updatePaymentStatus(order: any, newStatus: string) {
    // Assign new status
    const formJson = {
      status: newStatus,
    };

    // Convert to JSON string
    const jsonData = JSON.stringify(formJson);

    // Call your API or logic here
    this.api.updatePaymentsStatus(order.paymentId, jsonData).subscribe({
      next: (res: any) => {
        console.log('Status updated successfully:', res);
        Swal.fire('Status updated successfully');
      },
      error: (err: any) => {
        console.error('Status update failed:', err);
        Swal.fire('Status update failed');
      },
    });
  }
}
