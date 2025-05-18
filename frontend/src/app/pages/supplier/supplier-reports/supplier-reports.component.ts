import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../customer/service/customer.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SupplierService } from '../service/supplier.service';

@Component({
  selector: 'app-supplier-reports',
  templateUrl: './supplier-reports.component.html',
  styleUrls: ['./supplier-reports.component.scss'],
})
export class SupplierReportsComponent {
  miniItems: any[] = [];
  pendingOrders: any[] = [];
  deleverdOrders: any[] = [];
  showNotificattionDot = false;
  pollingSubscription: Subscription | undefined;

  selectedOrderType: string = '';
  isLoading: boolean = false;
  reportData: any[] = [];
  reportShown: boolean = false;

  constructor(
    private router: Router,
    private api: SupplierService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getPendingOrdersDetails();
    this.getDeleverdOrdersDetails();
  }

  displayedColumns: string[] = [
    'orderId',
    'price',
    'stock',
    'address',
    'mobile',
  ];
  displayedColumns2: string[] = [
    'orderId',
    'price',
    'stock',
    'address',
    'mobile',
  ];

  logout() {
    localStorage.clear();
    this.router.navigate(['/customer']);
  }

  getPendingOrdersDetails() {
    this.api
      .getPendingOrders(localStorage.getItem('userId'), 'Returnd')
      .subscribe({
        next: (response: any) => {
          this.pendingOrders = response;
        },
        error: (error: any) => {
          Swal.fire('Error While Report Data');
        },
      });
  }

  getDeleverdOrdersDetails() {
    this.api
      .getPendingOrders(localStorage.getItem('userId'), 'Delivered')
      .subscribe({
        next: (response: any) => {
          this.deleverdOrders = response;
        },
        error: (error: any) => {
          Swal.fire('Error While Gettig Customer Orders');
        },
      });
  }

  showReport() {
    this.isLoading = true;
    this.reportShown = false;
    setTimeout(() => {
      if (this.selectedOrderType === 'pending') {
        this.api.getPendingOrders(localStorage.getItem('userId'), 'Returnd').subscribe({
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
      } else if (this.selectedOrderType === 'delivered') {
        this.api.getPendingOrders(localStorage.getItem('userId'), 'Delivered').subscribe({
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
            Swal.fire('Error While Getting Delivered Orders');
          },
        });
      } else {
        this.reportData = [];
        this.reportShown = true;
        this.isLoading = false;
      }
    }, 600);
  }

  generateReport() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.selectedOrderType === 'pending') {
        this.exportToPDF();
      } else if (this.selectedOrderType === 'delivered') {
        this.exportToPDF1();
      }
      this.isLoading = false;
    }, 500);
  }

  exportToPDF() {
    try {
      const doc = new jsPDF('p', 'pt', 'a4');
      doc.setFontSize(18);
      doc.text('Return Orders Report', 40, 40);
      const currentDate = new Date().toLocaleDateString();
      doc.setFontSize(11);
      doc.text(`Generated on: ${currentDate}`, 40, 60);
      const columns = [
        { header: 'Order ID', dataKey: 'orderId' },
        { header: 'Total Price', dataKey: 'price' },
        { header: 'Item Count', dataKey: 'itemCount' },
        { header: 'Address', dataKey: 'address' },
        { header: 'Mobile No', dataKey: 'mobile_no' },
      ];
      const rows = this.reportData.map((order) => ({
        orderId: order.orderId || 'N/A',
        price: order.price || 'N/A',
        itemCount: order.itemCount || 'N/A',
        address: order.address || 'N/A',
        mobile_no: order.mobile_no || 'N/A',
      }));
      autoTable(doc, {
        columns: columns,
        body: rows,
        startY: 80,
        margin: { left: 40 },
        styles: {
          fontSize: 10,
          cellPadding: 5,
          overflow: 'linebreak',
        },
        columnStyles: {
          address: { cellWidth: 'wrap' },
        },
        headStyles: {
          fillColor: [63, 81, 181],
          textColor: 255,
        },
      });
      doc.save(
        `Return_Orders_Report_${new Date().toISOString().slice(0, 10)}.pdf`
      );
    } catch (error) {
      console.error('Error generating PDF:', error);
      Swal.fire('Error', 'Failed to generate PDF report', 'error');
    }
  }

  exportToPDF1() {
    try {
      const doc = new jsPDF('p', 'pt', 'a4');
      doc.setFontSize(18);
      doc.text('Delivered Orders Report', 40, 40);
      const currentDate = new Date().toLocaleDateString();
      doc.setFontSize(11);
      doc.text(`Generated on: ${currentDate}`, 40, 60);
      const columns = [
        { header: 'Order ID', dataKey: 'orderId' },
        { header: 'Total Price', dataKey: 'price' },
        { header: 'Item Count', dataKey: 'itemCount' },
        { header: 'Address', dataKey: 'address' },
        { header: 'Mobile No', dataKey: 'mobile_no' },
      ];
      const rows = this.reportData.map((order) => ({
        orderId: order.orderId || 'N/A',
        price: order.price || 'N/A',
        itemCount: order.itemCount || 'N/A',
        address: order.address || 'N/A',
        mobile_no: order.mobile_no || 'N/A',
      }));
      autoTable(doc, {
        columns: columns,
        body: rows,
        startY: 80,
        margin: { left: 40 },
        styles: {
          fontSize: 10,
          cellPadding: 5,
          overflow: 'linebreak',
        },
        columnStyles: {
          address: { cellWidth: 'wrap' },
        },
        headStyles: {
          fillColor: [63, 81, 181],
          textColor: 255,
        },
      });
      doc.save(
        `Delivered_Orders_Report_${new Date().toISOString().slice(0, 10)}.pdf`
      );
    } catch (error) {
      console.error('Error generating PDF:', error);
      Swal.fire('Error', 'Failed to generate PDF report', 'error');
    }
  }
}
