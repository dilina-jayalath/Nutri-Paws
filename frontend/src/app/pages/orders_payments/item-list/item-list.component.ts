import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CartDialogComponent } from '../../cart-dialog/cart-dialog.component';
import { OrderPaymentsService } from '../service/order-payments.service';
import Swal from 'sweetalert2';
import { PaymentGatewayComponent } from '../../payment-gateway/payment-gateway.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  showSubOrders = false;
  itemList: any[] = [];
  showPayments = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private api: OrderPaymentsService
  ) {}

  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }

  ngOnInit() {
    this.getSupAllItems();
  }

  getSupAllItems() {
    this.api.getAllSupItems().subscribe({
      next: (res: any) => {
        this.itemList = res;
      },
      error: (err: any) => {},
    });
  }

  openCart() {
    this.dialog.open(CartDialogComponent, {
      height: '800px',
      width: '800px',
    });
  }

  getImageUrl(emgUrl: string): string {
    // Fixes slashes and removes starting backslashes if any
    const fixedPath = emgUrl.replace(/\\/g, '/').replace(/^\/+/, '');
    return fixedPath.startsWith('assets')
      ? `/${fixedPath}`
      : `/assets/uploads/${fixedPath}`;
  }

  showItemPopup(item: any) {
    if (item.stock <= 0) {
      Swal.fire('Out of Stock', 'This item is out of stock and cannot be added to the cart.', 'error');
      return;
    }
    let stock = 1; // Default quantity
    let totalPrice = item.price; // Initialize total price
    console.log('item - ' + JSON.stringify(item));
    Swal.fire({
      title: `<strong>${item.itemName}</strong>`,
      html: `
                <p>Price per unit: <strong>${item.price.toFixed(2)}</strong></p>
                <p>Quantity: <strong><span id="quantity">${stock}</span></strong></p>
                <p>Total Price: <strong>Rs.<span id="totalPrice">${totalPrice.toFixed(
                  2
                )}</span></strong></p>
                <button id="decrease" class="swal2-confirm swal2-styled" style="background-color: red;">-</button>
                <button id="increase" class="swal2-confirm swal2-styled">+</button>
              `,
      showCancelButton: true,
      confirmButtonText: 'Add to Cart',
      cancelButtonText: 'Cancel',
      didOpen: () => {
        const quantitySpan = document.getElementById('quantity');
        const totalPriceSpan = document.getElementById('totalPrice');
        const increaseBtn = document.getElementById('increase');
        const decreaseBtn = document.getElementById('decrease');
        console.log(
          'quantitySpan - ' + quantitySpan,
          'totalPriceSpan - ' + totalPriceSpan,
          'increaseBtn - ' + increaseBtn,
          'decreaseBtn - ' + decreaseBtn
        );
        if (increaseBtn && decreaseBtn && quantitySpan && totalPriceSpan) {
          increaseBtn.addEventListener('click', () => {
            console.log(
              'increaseBtn- item.quantity - ' +
                item.quantity +
                ' quantity -' +
                stock
            );
            if (stock < item.stock) {
              stock++;
              quantitySpan.innerText = stock.toString();
              totalPriceSpan.innerText = (item.price * stock).toFixed(2);
            } else {
              Swal.fire('Stock Limit', 'You have reached the maximum stock available for this item.', 'error');
            }
          });

          decreaseBtn.addEventListener('click', () => {
            console.log('decreaseBtn - quantity' + stock);
            if (stock > 1) {
              stock--;
              quantitySpan.innerText = stock.toString();
              totalPriceSpan.innerText = (item.price * stock).toFixed(2);
            }
          });
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (stock) {
          // User clicked "Add to Cart" and selected a quantity
          console.log('item -' + item + 'quantity -' + stock);
          const customer_id = Number(localStorage.getItem('customerId')) || 0;

          if (!customer_id) {
            Swal.fire(
              'Error',
              'Customer ID not found. Please log in.',
              'error'
            );
            return;
          }

          this.dialog.open(PaymentGatewayComponent, {
            width: '600px',
            maxHeight: '90vh',
            data: {
              item: item,
              stock: stock,
            },
          });

          // this.api.getCartId(customer_id).subscribe({
          //   next: (res: any) => {
          //     if (!res) {
          //       this.createCart(customer_id, item, stock);
          //     } else {
          //       console.log('cart', res[0].cartId);

          //       this.addItemToCart(res[0].cartId, item, stock);
          //     }
          //   },
          //   error: (err: any) => {
          //     Swal.fire('Failed To get Cart');
          //   },
          // });
        }
      }
    });
  }

  createCart(customer_id: number, item: any, quantity: number) {
    const payload = {
      customerId: { customerId: customer_id },
    };

    this.api.createcart(payload).subscribe({
      next: (res: any) => {
        this.addItemToCart(res.cartId, item, quantity);
      },
      error: (err: any) => {
        Swal.fire('Failed To create Cart');
      },
    });
  }

  addItemToCart(cart_id: number, item: any, quantity: number) {
    console.log('cart id', cart_id, item);
    console.log('item', item);
    console.log('quantity', quantity);

    const payload = {
      cartId: cart_id,
      itemId: item.itemId,
      quantity: quantity,
    };
    console.log('payload', payload);
    this.api.addToCart(payload).subscribe({
      next: (res: any) => {
        Swal.fire('Item Added To cart');
      },
      error: (err: any) => {
        Swal.fire('Failed To add item to cart');
      },
    });
  }

  onAddItem() {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/customer']);
  }
}
