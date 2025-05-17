import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import Swal from 'sweetalert2';
import { InventoryService } from '../inventory.service';

interface Order {
  customerName: string;
  customerMobile: string;
  customerAddress: string;
  itemName: string;
  requestQuantity: number;
  availableQuantity: number;
}

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss'],
})
export class CustomerOrdersComponent {
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

  displayedColumns: string[] = [
    'id',
    //'customerName',
    'customerMobile',
    'customerAddress',
    'price',
    'requestQuantity',
    // 'availableQuantity',
    'action',
  ];

  statusOptions: string[] = [
    'Place',
    'Accept',
    'Delivered',
    'Returnd'
  
  ];

  // Sample data for orders
  orders: any[] = [];
  orderItems: any[] = [];

  ngOnInit(): void {
    this.getAllOrrders();
  }

  getAllOrrders() {
    this.api.getAllOrders().subscribe({
      next: (response: any) => {
        this.orders = response;
      },
      error: (error: any) => {
        Swal.fire('Error While Gettig Customer Orders');
      },
    });
  }

  updateOrderStatus(order: any, newStatus: string) {
    // Assign new status
    const formJson = {
      status: newStatus,
    };

    // Convert to JSON string
    const jsonData = JSON.stringify(formJson);

    // Call your API or logic here
    this.api.updateOrderStatus(order.orderId, jsonData).subscribe({
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

  viewOrder(order: any) {
    this.api.getOrderitems(order.orderId).subscribe({
      next: (response: any) => {
        this.orderItems = response;

        // Build HTML table
        const tableRows = response
          .map(
            (item: any) => `
                <tr>
                  <td>${item.itemId}</td>
                  <td>${item.price}</td>
                  <td>${item.qty}</td>
                </tr>
              `
          )
          .join('');

        const tableHtml = `
                <div style="overflow-x: auto;">
                  <table style="width:100%; border-collapse: collapse;">
                    <thead>
                      <tr>
                        <th style="border-bottom: 1px solid #ccc;">Item ID</th>
                        <th style="border-bottom: 1px solid #ccc;">Price</th>
                        <th style="border-bottom: 1px solid #ccc;">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>${tableRows}</tbody>
                  </table>
                </div>
              `;

        Swal.fire({
          title: 'Order Items',
          html: tableHtml,
          width: '800px',
          confirmButtonText: 'Close',
        });
      },
      error: (error: any) => {
        Swal.fire('Error While Gettig Order Items');
      },
    });
  }
}
