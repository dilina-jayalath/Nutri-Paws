import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../customer/service/customer.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { OrderPaymentsService } from '../service/order-payments.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.scss'],
})
export class AdminReportsComponent {
  miniItems: any[] = [];
  pendingOrders: any[] = [];
  deleverdOrders: any[] = [];
  showNotificattionDot = false;
  pollingSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private api: OrderPaymentsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCustomerPaymentDetails();
    this.getSupplierPaymentDetails();
  }

  // TABLE COLUMS NAME DEFINE
  displayedColumns: string[] = [
    'orderId',
    'address',
    'mobile',
    'price',
    'status',
  ];
  displayedColumns2: string[] = [
    'orderId',
    'address',
    'mobile',
    'price',
    'status',
  ];
  // LOGOUT FUNCTION
  logout() {
    localStorage.clear();
    this.router.navigate(['/customer']);
  }

  // GET CURRENT INVENTRY DETAILS
  getCustomerPaymentDetails() {
    this.api.getSupplierPayments(0).subscribe({
      next: (response: any) => {
        this.pendingOrders = response;
        console.log("customer - "+ JSON.stringify(response));
      },
      error: (error: any) => {
        Swal.fire('Error While Report Data');
      },
    });
  }

  // GET ORDERS DETAILS MONTHLY WISE
  getSupplierPaymentDetails() {
    this.api.getSupplierPayments(1).subscribe({
      next: (response: any) => {
        this.deleverdOrders = response;
      },
      error: (error: any) => {
        Swal.fire('Error While Gettig Customer Orders');
      },
    });
  }

  exportToPDF() {
    const doc = new jsPDF();

    // Title
    doc.text('Customer Orders Report', 14, 15);

    // Define table headers
    const head = [['Order ID', 'Address', 'Mobile No', 'Payment', 'Status']];

    // Map data for table rows
    const data = this.pendingOrders.map((order: any) => [
      order.orderId,
      order.address,
      order.mobile,
      order.price,
      order.status
    ]);

    // Add the table to the PDF
    autoTable(doc, {
      head: head,
      body: data,
      startY: 25,
    });

    // Save the PDF
    doc.save('customer-orders.pdf');
  }

  exportToPDF1() {
    const doc = new jsPDF();

    // Title
    doc.text('Supplier Orders Report', 14, 15);

    // Define table headers
    const head = [['Order ID', 'Address', 'Mobile No', 'Payment', 'Status']];

    // Map data for table rows
    const data = this.deleverdOrders.map((order: any) => [
      order.orderId,
      order.address,
      order.mobile,
      order.price,
      order.status
    ]);

    // Add the table to the PDF
    autoTable(doc, {
      head: head,
      body: data,
      startY: 25,
    });

    // Save the PDF
    doc.save('supplier-orders.pdf');
  }

}
