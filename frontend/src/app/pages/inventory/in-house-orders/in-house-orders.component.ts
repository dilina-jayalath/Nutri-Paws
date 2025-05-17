import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { InventoryService } from '../inventory.service';
import Swal from 'sweetalert2';

interface InHouseOrder {
  itemName: string;
  supplierName: string;
  quantity: number;
  price: number;
  deliveryDate: Date;
  status: string; // Packing, Shipping, etc.
}

@Component({
  selector: 'app-in-house-orders',
  templateUrl: './in-house-orders.component.html',
  styleUrls: ['./in-house-orders.component.scss'],
})
export class InHouseOrdersComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  orders: any[] = [];
  orderItems: any[] = [];

  constructor(private api: InventoryService) {}

  ngOnInit(): void {
    this.getAllSupplierOrders();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  onAddItem() {}

  displayedColumns: string[] = [
    'orderId',
    'address',
    'itemCount',
    'mobileNo',
    'price',
    'status',
    'action',
  ];

  getAllSupplierOrders() {
    this.api.getAllCustomerOrders().subscribe({
      next: (response: any) => {
        this.orders = response;
        console.log(this.orders);
      },
      error: (error: any) => {
        Swal.fire('Error While Gettig Customer Orders');
      },
    });
  }

  viewOrder(order: any) {
    this.api.getCustomerOrderitems(order.orderId).subscribe({
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

  updateOrderStatus(order: any, newStatus: string) {
    // Assign new status
    const formJson = {
      status: newStatus,
    };

    // Convert to JSON string
    const jsonData = JSON.stringify(formJson);

    // Call your API or logic here
    this.api.updateCustomerOrderStatus(order.orderId, jsonData).subscribe({
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

  statusOptions: string[] = ['Accept', 'Delivered', 'Returnd'];
}
