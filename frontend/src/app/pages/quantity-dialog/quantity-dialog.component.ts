import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-quantity-dialog',
  templateUrl: './quantity-dialog.component.html',
  styleUrls: ['./quantity-dialog.component.scss'],
})
export class QuantityDialogComponent {
  quantity: number = 1;
  maxQuantity: number = 10; // You can set this based on item stock

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.maxQuantity) {
      this.maxQuantity = data.maxQuantity;
    }
  }

  increaseQuantity() {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
