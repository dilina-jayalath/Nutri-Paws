import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AddNewItemDialogComponent } from '../add-new-item-dialog/add-new-item-dialog.component';
import { InventoryService } from '../inventory.service';
import { interval, Subscription } from 'rxjs';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory-dashboard',
  templateUrl: './inventory-dashboard.component.html',
  styleUrls: ['./inventory-dashboard.component.scss'],
})
export class InventoryDashboardComponent {
  displayedColumns: string[] = [
    'customerName',
    'itemName',
    'orderDate',
    'requestQuantity',
  ];
  inventoryItems: any[] = [];
  inHouseOrders: any[] = [];
  customerOrders: any[] = [];
  items: any[] = [];
  displayedItems: any[] = [];
  initialLimit: number = 5;
  isExpanded: boolean = false;
  initialCatLimit: number = 7;
  isCatExpanded: boolean = false;
  isBtnexpand: boolean = false;
  showNotificattionDot = false;
  count = 0;
  pollingSubscription: Subscription | undefined;
  miniItems: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private api: InventoryService
  ) {}

  // Sample data for customer orders with images and item names
  // customerOrders = [
  //   {
  //     customerName: 'John Doe',
  //     itemName: 'Item 1',
  //     orderDate: '2025-03-10',
  //     itemImage: 'image.jpg',
  //     requestQuantity: 2,
  //   },
  //   {
  //     customerName: 'Jane Smith',
  //     itemName: 'Item 2',
  //     orderDate: '2025-03-11',
  //     itemImage: 'image.jpg',
  //     requestQuantity: 1,
  //   },
  //   {
  //     customerName: 'Sam Wilson',
  //     itemName: 'Item 3',
  //     orderDate: '2025-03-12',
  //     itemImage: 'image.jpg',
  //     requestQuantity: 5,
  //   },
  //   {
  //     customerName: 'Alice Brown',
  //     itemName: 'Item 4',
  //     orderDate: '2025-03-13',
  //     itemImage: 'image.jpg',
  //     requestQuantity: 3,
  //   },
  //   {
  //     customerName: 'Bob White',
  //     itemName: 'Item 5',
  //     orderDate: '2025-03-14',
  //     itemImage: 'image.jpg',
  //     requestQuantity: 4,
  //   },
  // ];

  // Sample data for in-house orders
  // inHouseOrders = [
  //   {
  //     status: 'Pending',
  //     date: '2025-03-10',
  //     itemName: 'Item 1',
  //     itemImage: '../../../../assets/uploads/image3.jpg',
  //   },
  //   {
  //     status: 'In Progress',
  //     date: '2025-03-09',
  //     itemName: 'Item 2',
  //     itemImage: '../../../../assets/uploads/image3.jpg',
  //   },
  //   {
  //     status: 'Completed',
  //     date: '2025-03-08',
  //     itemName: 'Item 3',
  //     itemImage: '../../../../assets/uploads/image3.jpg',
  //   },
  // ];

  @ViewChild('sidenav') sidenav!: MatSidenav;

  ngOnInit() {
    this.getAllItems();
    this.startPolling();
    this.getAllSupplierOrders();
    this.getAllCustomerOrrders();
  }

  getAllSupplierOrders() {
    this.api.getAllCustomerOrders().subscribe({
      next: (response: any) => {
        this.inHouseOrders = response;
        console.log('Inhouse orders - ' + this.inHouseOrders);
      },
      error: (error: any) => {
        Swal.fire('Error While Gettig Customer Orders');
      },
    });
  }

  getAllCustomerOrrders() {
    this.api.getAllOrders().subscribe({
      next: (response: any) => {
        this.customerOrders = response;
      },
      error: (error: any) => {
        Swal.fire('Error While Gettig Customer Orders');
      },
    });
  }

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

  onViewMoreToggle() {
    this.isBtnexpand = !this.isBtnexpand;
    this.displayedItems = this.isBtnexpand
      ? this.items
      : this.items.slice(0, this.initialLimit);
    // Optional: You can add more logic here if needed
    console.log('Toggle state:', this.isBtnexpand);
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  startPolling() {
    this.pollingSubscription = interval(5000).subscribe(() => {
      this.checkItems();
    });
  }

  checkItems() {
    this.api.checkItems().subscribe({
      next: (response: any) => {
        if (response) {
          this.miniItems = response;
          this.showNotificattionDot = true;
        }
      },
      error: (error: any) => {
        this.showNotificattionDot = false;
      },
    });
  }

  openNotifications() {
    this.dialog
      .open(NotificationDialogComponent, {
        width: '400px',
        data: this.miniItems,
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

  onAddItem() {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/customer']);
  }

  addNewItem() {
    this.dialog
      .open(AddNewItemDialogComponent, {
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
}
