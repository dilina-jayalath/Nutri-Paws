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

  selectedReportType: string = '';
  isLoading: boolean = false;
  reportData: any[] = [];
  reportShown: boolean = false;

  constructor(
    private router: Router,
    private api: OrderPaymentsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCustomerPaymentDetails();
    this.getSupplierPaymentDetails();
  }

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

  logout() {
    localStorage.clear();
    this.router.navigate(['/customer']);
  }

  getCustomerPaymentDetails() {
    this.api.getSupplierPayments(0).subscribe({
      next: (response: any) => {
        this.pendingOrders = response;
      },
      error: (error: any) => {
        Swal.fire('Error While Report Data');
      },
    });
  }

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

  // --- NEW: Show Report logic ---
  showReport() {
    this.isLoading = true;
    this.reportShown = false;
    setTimeout(() => {
      if (this.selectedReportType === 'customer') {
        this.api.getSupplierPayments(0).subscribe({
          next: (response: any) => {
            this.pendingOrders = response;
            this.reportData = this.pendingOrders;
            this.reportShown = true;
            this.isLoading = false;
          },
          error: () => {
            this.pendingOrders = [];
            this.reportData = [];
            this.reportShown = true;
            this.isLoading = false;
            Swal.fire('Error While Report Data');
          },
        });
      } else if (this.selectedReportType === 'supplier') {
        this.api.getSupplierPayments(1).subscribe({
          next: (response: any) => {
            this.deleverdOrders = response;
            this.reportData = this.deleverdOrders;
            this.reportShown = true;
            this.isLoading = false;
          },
          error: () => {
            this.deleverdOrders = [];
            this.reportData = [];
            this.reportShown = true;
            this.isLoading = false;
            Swal.fire('Error While Getting Supplier Payments');
          },
        });
      } else {
        this.reportData = [];
        this.reportShown = true;
        this.isLoading = false;
      }
    }, 600);
  }

  // --- NEW: Download Report logic ---
  generateReport() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.selectedReportType === 'customer') {
        this.exportToPDF();
      } else if (this.selectedReportType === 'supplier') {
        this.exportToPDF1();
      }
      this.isLoading = false;
    }, 500);
  }

  exportToPDF() {
    const doc = new jsPDF();
    doc.text('Customer Payments Report', 14, 15);
    const head = [['Order ID', 'Address', 'Mobile No', 'Payment', 'Status']];
    const data = this.reportData.map((order: any) => [
      order.orderId,
      order.address,
      order.mobile,
      order.price,
      order.status
    ]);
    autoTable(doc, {
      head: head,
      body: data,
      startY: 25,
    });
    doc.save('customer-payments.pdf');
  }

  exportToPDF1() {
    const doc = new jsPDF();
    doc.text('Supplier Payments Report', 14, 15);
    const head = [['Order ID', 'Address', 'Mobile No', 'Payment', 'Status']];
    const data = this.reportData.map((order: any) => [
      order.orderId,
      order.address,
      order.mobile,
      order.price,
      order.status
    ]);
    autoTable(doc, {
      head: head,
      body: data,
      startY: 25,
    });
    doc.save('supplier-payments.pdf');
  }
}
