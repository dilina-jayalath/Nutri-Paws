import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer/service/customer.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { LoginService } from './service/login.service';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';
import { Router } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { SupplierSignupComponent } from '../supplier/supplier-signup/supplier-signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private api: LoginService,
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const requestBody = JSON.stringify(this.loginForm.value);
      // Call authentication service
      this.api.login(requestBody).subscribe(
        (response: any) => {
          console.log('Login response:', response);

          // Safely access response properties
          const user = response.user || {};
          const userRole = user.userRolId || {};
          const customer = response.customer || {};

          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userId', user.userId || '');
          localStorage.setItem('userRole', userRole.roleId || '');
          localStorage.setItem('rolename', userRole.roleName || '');

          // Only set customerId if it exists in the response
          if (customer.customerId) {
            localStorage.setItem('customerId', customer.customerId);
          }
          this.isLoading = false;
          Swal.fire('Login Success');
          if (response.user.userRolId.roleName === 'Customer') {
            this.router.navigate(['/customer']).then(() => {
              window.location.reload();
            });
            this.dialogRef.close();
          } else if (response.user.userRolId.roleName === 'Store') {
            this.router.navigate(['/stores']);
            this.dialogRef.close();
          } else if (response.user.userRolId.roleName === 'Admin') {
            this.router.navigate(['/order-payments']);
            this.dialogRef.close();
          } else if (response.user.userRolId.roleName === 'Supplier') {
            localStorage.setItem('customerId', '');
            this.router.navigate(['/supplier']);
            this.dialogRef.close();
          } else {
            this.dialogRef.close();
          }
        },
        (error: any) => {
          this.isLoading = false;
          alert('Login Failed! Please check your credentials.');
          console.error('Login error:', error);
        }
      );
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  openSignUp() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(SignupComponent, {
      height: '1000px',
      width: '1000px',
    });
  }
  openSellerSignUp() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(SupplierSignupComponent, {
      height: '1000px',
      width: '1000px',
    });
  }
}
