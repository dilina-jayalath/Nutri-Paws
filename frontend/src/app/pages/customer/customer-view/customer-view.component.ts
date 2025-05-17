import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../service/customer.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { QuantityDialogComponent } from '../../quantity-dialog/quantity-dialog.component';
import { LoginComponent } from '../../login/login.component';

// Define interfaces for the item and category
interface Item {
  id: number;
  imageUrl: string;
  label: string;
  icon: string;
  ratings: number;
  price: number;
  quantity: number;
}

interface Category {
  name: string;
  items: Item[];
  displayItems: Item[];
  isExpanded: boolean;
}

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss'],
})
export class CustomerViewComponent implements OnInit {
  isLoggedIn: boolean = false;
  roleName: string = '';
  items: any[] = [];
  categories: any[] = [];
  displayedItems: any[] = [];
  initialLimit: number = 10;
  isExpanded: boolean = false;
  initialCatLimit: number = 7;
  isCatExpanded: boolean = false;

  // Define categories and items with correct types
  constructor(
    private fb: FormBuilder,
    private api: CustomerService,
    public dialog: MatDialog
  ) {}

  offers = [
    {
      name: 'Item 1',
      imageUrl: '../../../../assets/uploads/image1.jpg',
      discount: 30,
    },
    {
      name: 'Item 2',
      imageUrl: '../../../../assets/uploads/image1.jpg',
      discount: 20,
    },
    {
      name: 'Item 3',
      imageUrl: '../../../../assets/uploads/image1.jpg',
      discount: 50,
    },
    {
      name: 'Item 4',
      imageUrl: '../../../../assets/uploads/image1.jpg',
      discount: 40,
    },
    // Add more items here as needed
  ];

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const roleName = localStorage.getItem('rolename') || '';

    this.isLoggedIn = isLoggedIn;
    this.roleName = roleName;

    this.getAllItems();
    this.setItemCategories();
  }

  // SET - FUNCTION OF SET ITEMS BY CATEGORY
  setItemCategories() {
    this.api.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response;
        console.log('Get item categories - ' + JSON.stringify(this.categories));

        this.categories.forEach((category) => {
          this.api.getItemsByCategory(category.categoryId).subscribe(
            (items: any) => {
              category.items = items;

              category.isExpanded = false;
              category.displayItems = items.slice(0, this.initialCatLimit);
              category.isExpanded = false;
            },
            (error: any) => {}
          );
        });
      },
      (error: any) => {}
    );
  }

  // SEE MORE - FUNCTION OF SEE MORE ITEMS BY CATEGORY SECTION
  seeMoreAllCatItems(category: any) {
    category.isExpanded = !category.isExpanded;
    if (category.isExpanded) {
      category.displayItems = [...category.items];
    } else {
      category.displayItems = category.items.slice(0, this.initialCatLimit);
    }
  }

  // GET- FUNCTION OF GET ALL ITEMS
  getAllItems() {
    this.api.getAllItems().subscribe(
      (response: any) => {
        this.items = response;
        this.displayedItems = this.items.slice(0, this.initialLimit);
        //{"itemId":1,"itemName":"shan","description":"This is a item","price":10,"stock":150,"emgUrl":"\\assets\\uploads\\image1.jpg","createdAt":"2025-03-13T06:48:56","updatedAt":"2025-03-19T21:59:52"}
      },
      (error: any) => {}
    );
  }

  // FUNCTION OF SEE ALL ITEMS IN HOME PAGE
  seeMoreAllItems() {
    this.isExpanded = !this.isExpanded;
    console.log('isExpanded - ' + this.isExpanded);
    this.displayedItems = this.isExpanded
      ? this.items
      : this.items.slice(0, this.initialLimit);
  }

  // FIXED IMAGE PATH
  getImageUrl(emgUrl: string): string {
    // Fixes slashes and removes starting backslashes if any
    const fixedPath = emgUrl.replace(/\\/g, '/').replace(/^\/+/, '');
    return fixedPath.startsWith('assets')
      ? `/${fixedPath}`
      : `/assets/uploads/${fixedPath}`;
  }

  // Method to load more items when "See More" is clicked
  loadMoreItems(category: any) {
    if (category.displayItems.length > 5) {
      // If already showing all items, revert to showing only 5
      category.displayItems = category.items.slice(0, 5);
    } else {
      // Show all items
      category.displayItems = [...category.items];
    }
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
          <p>Total Price: <strong>Rs <span id="totalPrice">${totalPrice.toFixed(
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

          this.api.getCartId(customer_id).subscribe({
            next: (res: any) => {
              if (!res) {
                this.createCart(customer_id, item, stock);
              } else {
                console.log('cart', res[0].cartId);

                this.addItemToCart(res[0].cartId, item, stock);
              }
            },
            error: (err: any) => {
              Swal.fire('Failed To get Cart');
            },
          });
        }
      }
    });
  }

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: 'Auto',
      height: 'Auto',
    });
  }

  addToCart(item: any) {
    if (item.stock <= 0) {
      Swal.fire('Out of Stock', 'This item is out of stock and cannot be added to the cart.', 'error');
      return;
    }
    const dialogRef = this.dialog.open(QuantityDialogComponent, {
      width: '350px',
      data: {
        maxQuantity: item.stock, // Pass available stock if needed
      },
    });

    dialogRef.afterClosed().subscribe((quantity) => {
      if (quantity) {
        // User clicked "Add to Cart" and selected a quantity
        console.log('shan -' + item + 'quantity -' + quantity);
        const customer_id = Number(localStorage.getItem('customerId')) || 0;

        if (!customer_id) {
          Swal.fire('Error', 'Customer ID not found. Please log in.', 'error');
          return;
        }
        console.log('customer_id -' + customer_id);
        this.api.getCartId(customer_id).subscribe({
          next: (res: any) => {
            if (!res) {
              this.createCart(customer_id, item, quantity);
            } else {
              console.log('cart', res[0].cartId);

              this.addItemToCart(res[0].cartId, item, quantity);
            }
          },
          error: (err: any) => {
            Swal.fire('Failed To get Cart');
          },
        });
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
        if (res?.message) {
          Swal.fire(res.message); // backend sends the success message
        } else {
          Swal.fire('Item Added To cart');
        }
      },
      error: (err: any) => {
        Swal.fire('Failed To add item to cart');
      },
    });
  }
}
