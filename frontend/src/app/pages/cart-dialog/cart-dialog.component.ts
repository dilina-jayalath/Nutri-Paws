import { Component, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { CartDialogService } from './service/cart-dialog.service';
import Swal from 'sweetalert2';
import { NgModel } from '@angular/forms';
import { PaymentGatewayComponent } from '../payment-gateway/payment-gateway.component';

//  CART ITEMS
export interface CartItem {
  itemId: number;
  itemName: string;
  description: string;
  price: number;
  quantity: number;
  emgUrl: string;
  cartId: number;
  createdAt: string;
  updatedAt: string;
  checked?: boolean;
}

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss'],
})
export class CartDialogComponent {
  isLoggedIn: boolean = false;
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  shippingCost: number = 0;
  total: number = 0;
  userId: string = '';
  customerAddress: string = '';
  customerMobile: string = '';
  @ViewChild('mobileInput') mobileInput!: NgModel;

  constructor(
    public dialogRef: MatDialogRef<CartDialogComponent>,
    private api: CartDialogService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {
    this.userId = localStorage.getItem('customerId') || '';
    this.shippingCost = this.calculateShipping();
  }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.getCartItems();
  }

  // GET CART ITEMS BY USER ID
  getCartItems() {
    this.api.getAllCartItems(this.userId).subscribe(
      (response: any) => {
        // Changed from CartItem[] to any to handle API response
        console.log('getAllCartItems - ' + JSON.stringify(response));
        this.cartItems = Array.isArray(response)
          ? response.map((item) => ({
              ...item,
              checked: true,
            }))
          : [];
        this.updateTotals();
      },
      (error: any) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  // UPDATE TOTAL PRICE IN SELECTED ITEMS IN CART
  updateTotals() {
    this.subtotal = this.cartItems
      .filter((item) => item.checked)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

    this.shippingCost = this.calculateShipping();
    this.total = this.subtotal + this.shippingCost;
  }

  // CALCULATE SHIPING
  calculateShipping(): number {
    return this.subtotal > 5000 ? 0 : 500;
  }

  // INCREASE QTY
  increaseQuantity(item: CartItem) {
    item.quantity++;
    this.updateTotals();
  }

  // DECREASE QTY
  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotals();
    }
  }

  // REMOVE ITEM
  removeItem(itemId: number, cartItemId: number) {
    // First remove locally for immediate UI update
    this.cartItems = this.cartItems.filter((item) => item.itemId !== itemId);
    this.updateTotals();

    // Then try to remove from server
    if (this.api.removeCartItem) {
      this.api.removeCartItem(cartItemId).subscribe(
        () => console.log('Item removed successfully'),
        (error: any) => {
          console.error('Error removing item:', error);
        }
      );
    }
  }

  // REDIRECT LOGIN PAGE
  redirectToLogin() {
    const loginDialog = this.dialog.open(LoginComponent, {
      height: '800px',
      width: '800px',
    });

    loginDialog.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.isLoggedIn = true;
        this.getCartItems();
      }
    });
  }

  // RE WRITE IMG URL IN CORRECLY
  getImageUrl(emgUrl: string): string {
    if (!emgUrl) return '/assets/images/placeholder-product.png';

    const fixedPath = emgUrl.replace(/\\/g, '/').replace(/^\/+/, '');
    return fixedPath.startsWith('assets')
      ? `/${fixedPath}`
      : `/assets/uploads/${fixedPath}`;
  }

  // PROCEED TO CHECKOUT
  proceedToCheckout() {
    if (this.total > 0 && this.customerAddress && this.customerMobile) {
      // Filter checked items and map to include only necessary fields
      const selectedItems = this.cartItems
        .filter((item) => item.checked)
        .map((item) => ({
          itemId: +item.itemId,
          cartItemId: +item.cartId,
          price: +item.price,
          quantity: +item.quantity, // Make sure quantity is included
          // Include any other necessary fields your backend expects
        }));

      const orderData = {
        orderItems: selectedItems,
        customerAddress: this.customerAddress,
        customerMobile: this.customerMobile,
        customerId: this.userId,
        totalAmount: this.total,
      };

      const dialogRef = this.dialog.open(PaymentGatewayComponent, {
                  width: '600px',
                  maxHeight: '90vh',
                  data: {
                    data: orderData,
                    type: 'Customer',
                  },
                });
  
                dialogRef.afterClosed().subscribe(result => {
                  if (result) {
                    this.cartItems = this.cartItems.filter((item) => !item.checked);
                    this.updateTotals();
                  } else {
                    this.cartItems = this.cartItems.filter((item) => !item.checked);
                    this.updateTotals();
                  }
                });

      console.log('Order item:', selectedItems);
      console.log('Order data being sent:', orderData);

      // this.api.createorder(orderData).subscribe({
      //   next: (res: any) => {
      //     Swal.fire({
      //       title: 'Order Placed!',
      //       text: 'Your order has been successfully placed.',
      //       icon: 'success',
      //     });
      //     // Remove the ordered items from cart
      //     this.cartItems = this.cartItems.filter((item) => !item.checked);
      //     this.updateTotals();
      //   },
      //   error: (err: any) => {
      //     Swal.fire({
      //       title: 'Error',
      //       text: 'Failed to place order. Please try again.',
      //       icon: 'error',
      //     });
      //     console.error('Order error:', err);
      //   },
      // });
    } else {
      Swal.fire({
        title: 'Incomplete Information',
        text: 'Please fill in your address and mobile number.',
        icon: 'warning',
      });
    }
  }
}
