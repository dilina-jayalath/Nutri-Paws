import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from '../../cart-dialog/cart-dialog.component';
import { LoginComponent } from '../../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-nav',
  templateUrl: './customer-nav.component.html',
  styleUrls: ['./customer-nav.component.scss'],
})
export class CustomerNavComponent {
  isLoggedIn: boolean = false;
  roleName: string = '';
  profileMenuOpen = false;
  cartItemCount = 0;
  notificationCount = 0;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.checkAuthStatus();
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

  // NOTIFICATION FUNCTION OF GET NOTIFICATION
  openNotifications() {
    console.log('Opening notifications...');
  }

  // TROGGLE - FUNCTION OF TROGGLE PROFILE MENU
  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  // PROFILE - VIEW PROFILE FUNCTION OF VIEW PROFILE
  viewProfile() {
    this.router.navigate(['/profile']);
    this.profileMenuOpen = false;
  }

  // ORDERS - FUNCTION OF VIEW ORDERS
  viewOrders() {
    this.router.navigate(['/own-orders']);
    this.profileMenuOpen = false;
  }

  // REPORTS - FUNCTION OF VIEW REPORTS
  viewReports() {
    this.router.navigate(['/cus-report']);
    this.profileMenuOpen = false;
  }

  // NAVIGATE - FUNCTION OF NAVIGATE HOME
  navigateHome() {
    this.router.navigate(['/customer']);
  }

  // CHECK IS ACTIVE OR NOTE
  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
