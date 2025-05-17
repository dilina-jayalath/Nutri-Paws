import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CartDialogComponent } from '../../cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-system-payments',
  templateUrl: './system-payments.component.html',
  styleUrls: ['./system-payments.component.scss'],
})
export class SystemPaymentsComponent {
  showSubOrders = false;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router
  ) {}

  orders = [
    {
      itemName: 'Product A',
      supplierName: 'Supplier X',
      boughtUnitPrice: 50,
      soldUnitPrice: 75,
      boughtItemCount: 100,
      soldItemCount: 90,
      get totalBoughtPrice() {
        return this.boughtUnitPrice * this.boughtItemCount;
      },
      get totalSoldPrice() {
        return this.soldUnitPrice * this.soldItemCount;
      },
      get profit() {
        return this.totalSoldPrice - this.totalBoughtPrice;
      },
    },
    {
      itemName: 'Product B',
      supplierName: 'Supplier Y',
      boughtUnitPrice: 30,
      soldUnitPrice: 45,
      boughtItemCount: 200,
      soldItemCount: 150,
      get totalBoughtPrice() {
        return this.boughtUnitPrice * this.boughtItemCount;
      },
      get totalSoldPrice() {
        return this.soldUnitPrice * this.soldItemCount;
      },
      get profit() {
        return this.totalSoldPrice - this.totalBoughtPrice;
      },
    },
  ];

  displayedColumns: string[] = [
    'itemName',
    'supplierName',
    'boughtUnitPrice',
    'soldUnitPrice',
    'boughtItemCount',
    'soldItemCount',
    'totalBoughtPrice',
    'totalSoldPrice',
    'profit',
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
