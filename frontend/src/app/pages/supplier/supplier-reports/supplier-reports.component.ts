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

  constructor(
    private router: Router,
    private api: SupplierService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getPendingOrdersDetails();
    this.getDeleverdOrdersDetails();
  }

  // TABLE COLUMS NAME DEFINE
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
  // LOGOUT FUNCTION
  logout() {
    localStorage.clear();
    this.router.navigate(['/customer']);
  }

  // GET RETURN ORDER DETAILS
  getPendingOrdersDetails() {
    this.api
      .getPendingOrders(localStorage.getItem('userId'), 'Returnd')
      .subscribe({
        next: (response: any) => {
          this.pendingOrders = response;
          console.log(this.pendingOrders);
        },
        error: (error: any) => {
          Swal.fire('Error While Report Data');
        },
      });
  }

  // GET DELIVERED ORDERS
  getDeleverdOrdersDetails() {
    this.api
      .getPendingOrders(localStorage.getItem('userId'), 'Delivered')
      .subscribe({
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
    try {
      const doc = new jsPDF('p', 'pt', 'a4');

      // Title
      doc.setFontSize(18);
      doc.text('Return Orders Report', 40, 40);

      // Add current date
      const currentDate = new Date().toLocaleDateString();
      doc.setFontSize(11);
      doc.text(`Generated on: ${currentDate}`, 40, 60);

      // Define table columns
      const columns = [
        { header: 'Order ID', dataKey: 'orderId' },
        { header: 'Total Price', dataKey: 'price' },
        { header: 'Item Count', dataKey: 'itemCount' },
        { header: 'Address', dataKey: 'address' },
        { header: 'Mobile No', dataKey: 'mobile_no' },
      ];

      // Map data for table
      const rows = this.pendingOrders.map((order) => ({
        orderId: order.orderId || 'N/A',
        price: order.price || 'N/A',
        itemCount: order.itemCount || 'N/A',
        address: order.address || 'N/A',
        mobile_no: order.mobile_no || 'N/A',
      }));

      // Add the table
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
          fillColor: [63, 81, 181], // Mat-primary color
          textColor: 255,
        },
      });

      // Save the PDF
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

      // Title
      doc.setFontSize(18);
      doc.text('Delivered Orders Report', 40, 40);

      // Add current date
      const currentDate = new Date().toLocaleDateString();
      doc.setFontSize(11);
      doc.text(`Generated on: ${currentDate}`, 40, 60);

      // Define table columns
      const columns = [
        { header: 'Order ID', dataKey: 'orderId' },
        { header: 'Total Price', dataKey: 'price' },
        { header: 'Item Count', dataKey: 'itemCount' },
        { header: 'Address', dataKey: 'address' },
        { header: 'Mobile No', dataKey: 'mobile_no' },
      ];

      // Map data for table
      const rows = this.deleverdOrders.map((order) => ({
        orderId: order.orderId || 'N/A',
        price: order.price || 'N/A',
        itemCount: order.itemCount || 'N/A',
        address: order.address || 'N/A',
        mobile_no: order.mobile_no || 'N/A',
      }));

      // Add the table
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
          fillColor: [63, 81, 181], // Mat-primary color
          textColor: 255,
        },
      });

      // Save the PDF
      doc.save(
        `Delivered_Orders_Report_${new Date().toISOString().slice(0, 10)}.pdf`
      );
    } catch (error) {
      console.error('Error generating PDF:', error);
      Swal.fire('Error', 'Failed to generate PDF report', 'error');
    }
  }
}
