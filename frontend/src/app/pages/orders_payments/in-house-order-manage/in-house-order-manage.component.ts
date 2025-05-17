import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CartDialogComponent } from '../../cart-dialog/cart-dialog.component';

interface InHouseOrder {
  itemName: string;
  supplierName: string;
  quantity: number;
  price: number;
  deliveryDate: Date;
  status: string; // Packing, Shipping, etc.
}

@Component({
  selector: 'app-in-house-order-manage',
  templateUrl: './in-house-order-manage.component.html',
  styleUrls: ['./in-house-order-manage.component.scss'],
})
export class InHouseOrderManageComponent {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router
  ) {}

  displayedColumns: string[] = [
    'itemName',
    'supplierName',
    'quantity',
    'price',
    'deliveryDate',
    'status',
  ];

  orders: InHouseOrder[] = [
    {
      itemName: 'Item 1',
      supplierName: 'Supplier A',
      quantity: 100,
      price: 150,
      deliveryDate: new Date('2025-03-20'),
      status: 'Packing',
    },
    {
      itemName: 'Item 2',
      supplierName: 'Supplier B',
      quantity: 50,
      price: 200,
      deliveryDate: new Date('2025-03-25'),
      status: 'Shipping',
    },
    {
      itemName: 'Item 3',
      supplierName: 'Supplier C',
      quantity: 200,
      price: 120,
      deliveryDate: new Date('2025-03-28'),
      status: 'Warehouse',
    },
  ];

  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }

  onAddItem() {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/customer']);
  }

  openCart() {
    this.dialog.open(CartDialogComponent, {
      height: '800px',
      width: '800px',
    });
  }
}
