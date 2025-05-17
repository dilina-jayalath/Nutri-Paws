import { Component } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';
import { NotificationDialogComponent } from '../inventory-dashboard/notification-dialog/notification-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.scss'],
})
export class InventoryReportComponent {
  miniItems: any[] = [];
  currentInventory: any[] = [];
  monthlyOrders: any[] = [];
  showNotificattionDot = false;
  pollingSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private api: InventoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.startPolling();
    this.getCurrentInventoryDetails();
    this.getMonthlyOrdersDetails();
  }

  // TABLE COLUMS NAME DEFINE
  displayedColumns: string[] = ['itemName', 'price', 'stock'];
  displayedColumns2: string[] = ['month', 'totalCount', 'totalPrice'];

  // LOGOUT FUNCTION
  logout() {
    localStorage.clear();
    this.router.navigate(['/customer']);
  }

  // NOTIFICATION SECTION OPEN
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

  // CHECK ITEM STORK FOR NOTIFICATION
  startPolling() {
    this.pollingSubscription = interval(5000).subscribe(() => {
      this.checkItems();
    });
  }

  // CHECK ITEMS
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

  // GET CURRENT INVENTRY DETAILS
  getCurrentInventoryDetails() {
    this.api.getAllCurrentInventry().subscribe({
      next: (response: any) => {
        this.currentInventory = response;
      },
      error: (error: any) => {
        Swal.fire('Error While Gettig Customer Orders');
      },
    });
  }

  // GET ORDERS DETAILS MONTHLY WISE
  getMonthlyOrdersDetails() {
    this.api.getOrdersByMonth().subscribe({
      next: (response: any) => {
        this.monthlyOrders = response;
      },
      error: (error: any) => {
        Swal.fire('Error While Gettig Customer Orders');
      },
    });
  }

  exportToPDF() {
    const doc = new jsPDF();

    // Title
    doc.text('Inventory Report', 14, 15);

    // Define table headers
    const head = [['Item Name', 'Item Price', 'Stock']];

    // Map data for table rows
    const data = this.currentInventory.map((item: any) => [
      item.itemName,
      item.price,
      item.stock,
    ]);

    // Add the table to the PDF
    autoTable(doc, {
      head: head,
      body: data,
      startY: 25,
    });

    // Save the PDF
    doc.save('Inventory Stock.pdf');
  }
  exportToPDF1() {
    const doc = new jsPDF();

    // Title
    doc.text('Monthly Orders Report', 14, 15);

    // Define table headers
    const head = [
      ['Month', 'All Item Selling Count', 'Total Income Item Wise'],
    ];

    // Map data for table rows
    const data = this.monthlyOrders.map((item: any) => [
      item.month,
      item.totalCount,
      item.totalPrice,
    ]);

    // Add the table to the PDF
    autoTable(doc, {
      head: head,
      body: data,
      startY: 25,
    });

    // Save the PDF
    doc.save('Monthly orders.pdf');
  }
}
