import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../../customer/service/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNewItemDialogComponent } from '../../inventory/add-new-item-dialog/add-new-item-dialog.component';
import { AddNewSupplierItemComponent } from '../add-new-supplier-item/add-new-supplier-item.component';
import Swal from 'sweetalert2';
import { SupplierService } from '../service/supplier.service';
import { ConfirmDialogComponentComponent } from '../../confirm-dialog-component/confirm-dialog-component.component';
import { ViewItemDialogComponent } from '../view-item-dialog/view-item-dialog.component';

interface Item {
  id: number;
  imageUrl: string;
  label: string;
  icon: string;
  quantity: number;
  price: number; // Added price property
}

interface Category {
  name: string;
  items: Item[];
  displayItems: Item[];
}

// models/supplier-item.model.ts
export interface SupplierItem {
  supplierItemId: number;
  itemName: string;
  description: string;
  price: number;
  stock: number;
  emgUrl: string | null;
  supId: number;
  createdAt: string;
  updatedAt: string;
  categories: any[] | null; // You can create a proper Category interface later
}

@Component({
  selector: 'app-supplier-view',
  templateUrl: './supplier-view.component.html',
  styleUrls: ['./supplier-view.component.scss'],
})
export class SupplierViewComponent {
  isLoggedIn: boolean = false;
  isLoading = true;
  roleName: string = '';
  items: any[] = [];
  constructor(
    private fb: FormBuilder,
    private api: SupplierService,
    public dialog: MatDialog
  ) {}

  orders = [
    {
      name: 'Item 1',
      user: 'Kasun',
      imageUrl: '../../../../assets/uploads/image5.jpg',
      qty: 30,
    },
    {
      name: 'Item 2',
      user: 'Dilum',
      imageUrl: '../../../../assets/uploads/image5.jpg',
      qty: 20,
    },
    {
      name: 'Item 3',
      user: 'Kamal',
      imageUrl: '../../../../assets/uploads/image5.jpg',
      qty: 50,
    },
    {
      name: 'Item 4',
      user: 'Nimal',
      imageUrl: '../../../../assets/uploads/image5.jpg',
      qty: 40,
    },
    // Add more items here as needed
  ];

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const roleName = localStorage.getItem('rolename') || '';
    this.setSupplierDetails();
    this.loadItems();
    this.isLoggedIn = isLoggedIn;
    this.roleName = roleName;
  }

  setSupplierDetails() {
    console.log('run Supplier - ' + localStorage.getItem('userId'));
    this.api.getSupplierDetails(localStorage.getItem('userId')).subscribe(
      (response: any) => {
        const supplier = response[0]; // Assuming response is an array with one supplier
        console.log('Supplier - ' + JSON.stringify(supplier));
        localStorage.setItem('customerId', supplier.supplierId);
        console.log('Supplier response.supplierId - ' + supplier.supplierId);
        console.log('Supplier id - ' + localStorage.getItem('customerId'));
      },
      (error: any) => {}
    );
  }

  loadItems(): void {
    const supplierId = localStorage.getItem('userId');

    console.log('supId', supplierId);

    this.api.getSupplierItems(supplierId).subscribe({
      next: (response: SupplierItem[]) => {
        this.items = response;
        this.isLoading = false;
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Failed to load items. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        this.isLoading = false;
        console.error('Error loading items:', error);
      },
    });
  }

  openAddItemDialog(): void {
    const dialogRef = this.dialog.open(AddNewSupplierItemComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadItems();
      }
    });
  }
  deleteItem(itemId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this item?',
        confirmText: 'Delete',
        cancelText: 'Keep',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('Deleting item with ID:', itemId);
        this.api.deleteItem(itemId).subscribe({
          next: (res: any) => {
            if (res?.message) {
              Swal.fire(res.message); // backend sends the success message
            } else {
              Swal.fire('Item Deleted');
            }
            this.loadItems(); // Refresh your items list
          },
          error: (err) => {
            console.error('Delete error:', err);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete item',
              icon: 'error',
              timer: 2000,
              showConfirmButton: false,
            });
          },
        });
      }
    });
  }

  getAllItems() {
    // this.api.getAllItems().subscribe(
    //   (response: any) => {
    //     console.log(response);
    //   },
    //   (error: any) => {}
    // );
  }
  // Method to load more items when "See More" is clicked
  loadMoreItems(category: Category) {
    category.displayItems = category.items; // Show all items
  }

  editItem(item: any) {}

  AddItem() {
    this.dialog
      .open(AddNewSupplierItemComponent, {
        height: '800px',
        width: '800px',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          console.log('Dialog closed with result:', result);
        } else {
          console.log('Dialog closed without result');
        }
      });
  }

  showItemPopup(item: any) {
    if (item.quantity <= 0) {
      Swal.fire('Out of Stock', 'This item is out of stock and cannot be added to the cart.', 'error');
      return;
    }
    let quantity = 1; // Default quantity
    let totalPrice = item.price; // Initialize total price

    Swal.fire({
      title: `<strong>${item.label}</strong>`,
      html: `
        <p>Price per unit: <strong>${item.price.toFixed(2)}</strong></p>
        <p>Quantity: <strong><span id="quantity">${quantity}</span></strong></p>
        <p>Total Price: <strong>$<span id="totalPrice">${totalPrice.toFixed(
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

        if (increaseBtn && decreaseBtn && quantitySpan && totalPriceSpan) {
          increaseBtn.addEventListener('click', () => {
            if (quantity < item.quantity) {
              quantity++;
              quantitySpan.innerText = quantity.toString();
              totalPriceSpan.innerText = (item.price * quantity).toFixed(2);
            }
          });

          decreaseBtn.addEventListener('click', () => {
            if (quantity > 1) {
              quantity--;
              quantitySpan.innerText = quantity.toString();
              totalPriceSpan.innerText = (item.price * quantity).toFixed(2);
            }
          });
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.addToCart(item, quantity);
      }
    });
  }

  addToCart(item: any, quantity: number) {
    const customer_id = Number(localStorage.getItem('customerId')) || 0;

    if (!customer_id) {
      Swal.fire('Error', 'Customer ID not found. Please log in.', 'error');
      return;
    }

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
    console.log('add', cart_id, item);
    console.log('quantity', quantity);

    const payload = {
      cartId: { cart_id: cart_id },
      itemId: { itemId: item.id },
      quantity: quantity,
    };

    this.api.addToCart(payload).subscribe({
      next: (res: any) => {
        Swal.fire('Item Added To cart');
      },
      error: (err: any) => {
        Swal.fire('Failed To add item to cart');
      },
    });
  }

  // Add these methods to your SupplierViewComponent class
  viewItemDetails(item: SupplierItem): void {
    this.dialog.open(ViewItemDialogComponent, {
      width: '500px',
      data: item,
    });
  }

  openEditItemDialog(item: SupplierItem): void {
    const dialogRef = this.dialog.open(AddNewSupplierItemComponent, {
      width: '600px',
      data: item, // Pass the existing item data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadItems(); // Refresh the list after editing
      }
    });
  }
}
