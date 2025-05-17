import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { InventoryService } from '../../inventory/inventory.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../../inventory/inventory-dashboard/notification-dialog/notification-dialog.component';
import Swal from 'sweetalert2';
import { CustomerService } from '../service/customer.service';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-customer-reports',
  templateUrl: './customer-reports.component.html',
  styleUrls: ['./customer-reports.component.scss'],
})
export class CustomerReportsComponent {
  miniItems: any[] = [];
  pendingOrders: any[] = [];
  deleverdOrders: any[] = [];
  showNotificattionDot = false;
  pollingSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private api: CustomerService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getPendingOrdersDetails();
    this.getDeleverdOrdersDetails();
  }

  // TABLE COLUMS NAME DEFINE
  displayedColumns: string[] = ['orderId', 'price', 'stock','address','mobile'];
  displayedColumns2: string[] = ['orderId', 'price', 'stock','address','mobile'];
  // LOGOUT FUNCTION
  logout() {
    localStorage.clear();
    this.router.navigate(['/customer']);
  }

  // GET CURRENT INVENTRY DETAILS
  getPendingOrdersDetails() {
    this.api.getPendingOrders(localStorage.getItem('customerId')).subscribe({
      next: (response: any) => {
        this.pendingOrders = response;
        console.log(this.pendingOrders);
      },
      error: (error: any) => {
        Swal.fire('Error While Report Data');
      },
    });
  }

  // GET ORDERS DETAILS MONTHLY WISE
  getDeleverdOrdersDetails() {
    this.api.getDeleverdOrders(localStorage.getItem('customerId')).subscribe({
      next: (response: any) => {
        this.deleverdOrders = response;
        console.log(this.deleverdOrders);
      },
      error: (error: any) => {
        Swal.fire('Error While Gettig Customer Orders');
      },
    });
  }

  exportToPDF() {
    const doc = new jsPDF();

    // Title
    doc.text('Pending Orders Report', 14, 15);

    // Define table headers
    const head = [['Order ID', 'Total Order Price', 'Item Count', 'Address', 'Mobile No']];

    // Map data for table rows
    const data = this.pendingOrders.map((order: any) => [
      order.orderId,
      order.price,
      order.itemCount,
      order.address,
      order.mobile_no
    ]);

    // Add the table to the PDF
    autoTable(doc, {
      head: head,
      body: data,
      startY: 25,
    });

    // Save the PDF
    doc.save('pending-orders.pdf');
  }


  exportToPDF1() {
    const doc = new jsPDF();

    // Title
    doc.text('Delevered Orders Report', 14, 15);

    // Define table headers
    const head = [['Order ID', 'Total Order Price', 'Item Count', 'Address', 'Mobile No']];

    // Map data for table rows
    const data = this.deleverdOrders.map((order: any) => [
      order.orderId,
      order.price,
      order.itemCount,
      order.address,
      order.mobile_no
    ]);

    // Add the table to the PDF
    autoTable(doc, {
      head: head,
      body: data,
      startY: 25,
    });

    // Save the PDF
    doc.save('pending-orders.pdf');
  }
}
