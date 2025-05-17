import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CartDialogComponent } from '../../cart-dialog/cart-dialog.component';
import { OrderPaymentsService } from '../service/order-payments.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-orders-payments-dashboard',
  templateUrl: './orders-payments-dashboard.component.html',
  styleUrls: ['./orders-payments-dashboard.component.scss'],
})


export class OrdersPaymentsDashboardComponent {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private api: OrderPaymentsService
  ) {}
  // Sample data for inventory items with images
  prndingOrders: any[] = [];
  showSubOrders = false;
  showPayments = false;
  showNotificattionDot = false;
  pollingSubscription: Subscription | undefined;
  orders: any[] = []

  displayedColumns: string[] = ['mobile_no', 'address', 'itemCount', 'status'];
  inHouseDisplayedColumns: string[] = ['orderId', 'mobile', 'address', 'price', 'status'];
  returnedOrdersDisplayedColumns: string[] = ['mobile', 'address', 'itemName', 'status'];
  returnedOrdersDataSource = new MatTableDataSource<any>();
  dataSource = new MatTableDataSource<any>();
  inHousePaymentsDataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  inHousePayments: any[] = [];

  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }

  ngOnInit() {
    this.getAllOrders();
    this.dataSource.paginator = this.paginator;
    this.getAllPayments();
    this.allReturend();
    if(localStorage.getItem('rolename') === 'Admin'){
      this.startPolling();
    }

  }

  getAllOrders() {
    this.api.getAllOrders().subscribe({
      next: (response: any) => {
        this.prndingOrders = response;
        this.dataSource = new MatTableDataSource(this.prndingOrders);
        this.dataSource.paginator = this.paginator;
      },
      error: (error: any) => {
        Swal.fire('Error while getting Orders');
      },
    });
  }

  getAllPayments(){
    this.api.getSupplierPayments(0).subscribe({
      next: (response: any) => {
        this.inHousePayments = response;
        const limitedPayments = response.slice(0, 3);
        this.inHousePaymentsDataSource = new MatTableDataSource(limitedPayments);
      },
      error: (err: any) => {

      }
    })
  }
  allReturend(){
    this.api.getAllOrders().subscribe({
      next: (response: any) => {
        const returnedOrders = response.filter((order: any) => order.status === 'Returnd').slice(0, 3);
        this.returnedOrdersDataSource = new MatTableDataSource(returnedOrders);
      },
      error: () => {
        Swal.fire('Error while getting Orders');
      }
    });
  }

  openCart() {
    this.dialog.open(CartDialogComponent, {
      height: '800px',
      width: '800px',
    });
  }

  onAddItem() {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/customer']);
  }

  startPolling() {
      this.pollingSubscription = interval(5000).subscribe(() => {
        this.checkPlacedOrders();
      });
    }

    checkPlacedOrders(){
      this.api.getAllSupplierOrder().subscribe({
            next: (response: any) => {
              this.orders = response;
              this.showNotificattionDot = this.orders.some(order => order.status === 'Place');
            },
            error: (error: any) => {
              this.showNotificattionDot = false;
            },
          });
    }

    openNotification() {
      if (this.showNotificattionDot) {
        Swal.fire({
          icon: 'info',
          title: 'Notification',
          text: 'Your Order Placed By Supplier',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/supplier-orders-new']);
          }
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Notification',
          text: 'No new notifications',
        });
      }
    }

}
