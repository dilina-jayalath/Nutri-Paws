import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartDialogComponent } from '../../cart-dialog/cart-dialog.component';
import { LoginComponent } from '../../login/login.component';
import { NotificationDialogComponent } from '../../inventory/inventory-dashboard/notification-dialog/notification-dialog.component';
import { NavbarService } from '../service/navbar.service';
import { interval, Subscription } from 'rxjs';
import { SupAlertComponent } from '../../supplier/sup-alert/sup-alert.component';

@Component({
  selector: 'app-supplier-nav',
  templateUrl: './supplier-nav.component.html',
  styleUrls: ['./supplier-nav.component.scss'],
})
export class SupplierNavComponent {
  isLoggedIn: boolean = false;
  roleName: string = '';
  profileMenuOpen = false;
  cartItemCount = 0;
  notificationCount = 0;
  miniItems: any[] = [];
  showNotificattionDot = false;
  pollingSubscription: Subscription | undefined;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private api: NavbarService
  ) {}

  ngOnInit() {
    this.checkAuthStatus();
    this.startPolling();
    // You would typically load cart count from a service here
    // this.loadCartCount();
  }

  // CHECK - FUNCTION OF CHECK AUTH STATUS
  checkAuthStatus() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.roleName = localStorage.getItem('rolename') || '';
  }

  // GET - FUNCTION OF GET USER NAME
  getUserName(): string {
    return localStorage.getItem('username') || 'User';
  }

  // OPEN - FUNCTION OF OPEN CART
  openCart() {
    this.dialog.open(CartDialogComponent, {
      height: '800px',
      width: '800px',
    });
  }

  // FUNCTION OF OPEN LOGIN
  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '1000px',
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.checkAuthStatus(); // Update status after login
    });
  }

  // LOGOUT - FUNCTION OF LOGOUT
  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.roleName = '';
    this.router.navigate(['/customer']).then(() => {
      window.location.reload();
    });
  }

  startPolling() {
    this.pollingSubscription = interval(5000).subscribe(() => {
      this.checkItems();
    });
  }

  checkItems() {
    this.api.checkItems(localStorage.getItem('userId')).subscribe({
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

  // NOTIFICATION FUNCTION OF GET NOTIFICATION
  openNotifications() {
    console.log('itemst' + JSON.stringify(this.miniItems));
    this.dialog
      .open(SupAlertComponent, {
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

  // TROGGLE - FUNCTION OF TROGGLE PROFILE MENU
  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  // PROFILE - VIEW PROFILE FUNCTION OF VIEW PROFILE
  viewProfile() {
    this.router.navigate(['/supplier-profile']);
    this.profileMenuOpen = false;
  }

  // ORDERS - FUNCTION OF VIEW ORDERS
  viewOrders() {
    this.router.navigate(['/orders']);
    this.profileMenuOpen = false;
  }

  viewMyOrders() {
    this.router.navigate(['/own-supplier-orders']);
    this.profileMenuOpen = false;
  }
  viewSupRerports() {
    this.router.navigate(['/sup-report']);
    this.profileMenuOpen = false;
  }

  // NAVIGATE - FUNCTION OF NAVIGATE HOME
  navigateHome() {
    this.router.navigate(['/supplier']);
  }

  // CHECK IS ACTIVE OR NOTE
  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
