import { Component } from '@angular/core';
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
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent {

  displayedColumns: string[] = ['itemName', 'supplierName', 'quantity', 'price', 'deliveryDate', 'action'];

  orders: InHouseOrder[] = [
    {
      itemName: 'Item 1',
      supplierName: 'Supplier A',
      quantity: 100,
      price: 150,
      deliveryDate: new Date('2025-03-20'),
      status: 'Packing'
    },
    {
      itemName: 'Item 2',
      supplierName: 'Supplier B',
      quantity: 50,
      price: 200,
      deliveryDate: new Date('2025-03-25'),
      status: 'Shipping'
    },
    {
      itemName: 'Item 3',
      supplierName: 'Supplier C',
      quantity: 200,
      price: 120,
      deliveryDate: new Date('2025-03-28'),
      status: 'Warehouse'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Any initialization logic you need
  }


   approveOrder(order: any) {
            Swal.fire({
              title: 'Are you sure?',
              text: `Do you want to approve the order for ${order.customerName}?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, approve it!',
              cancelButtonText: 'No, cancel',
            }).then((result) => {
              if (result.isConfirmed) {
                // Logic to approve the order
                console.log('Order approved for', order.customerName);
                // You can add additional logic here, like updating the order status in the backend
                Swal.fire('Approved!', 'The order has been approved.', 'success');
              } else {
                Swal.fire('Cancelled', 'The order was not approved.', 'error');
              }
            });
          }

}
