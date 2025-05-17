import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../signup/service/signup.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/environments/custom-validators';
import Swal from 'sweetalert2';
import { LoginComponent } from '../../login/login.component';
import { SupplierService } from '../service/supplier.service';

@Component({
  selector: 'app-supplier-signup',
  templateUrl: './supplier-signup.component.html',
  styleUrls: ['./supplier-signup.component.scss'],
})
export class SupplierSignupComponent {
  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private api: SupplierService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.signupForm = this.fb.group(
      {
        companyName: ['', [Validators.required]],
        registrationNumber: ['', [Validators.required]],
        fName: ['', [Validators.required]],
        lName: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
        address: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        terms: [false, [Validators.requiredTrue]],
      },
      {
        validator: CustomValidators.passwordMatchValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onFileSelected(event: any): void {
    // Handle file selection for company logo
    const file = event.target.files[0];
    if (file) {
      // Process the file (upload/preview)
    }
  }

  onSignup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const payloadUser = {
      userName: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      userRolId: { roleId: 4 },
    };

    console.log('Creating user login:', payloadUser);

    this.api.createUserLogin(payloadUser).subscribe({
      next: (userResponse: any) => {
        console.log('User created successfully:', userResponse);

        // Use the actual user ID from the response
        const payloadCustomer = {
          fName: this.signupForm.value.fName,
          lName: this.signupForm.value.lName,
          email: this.signupForm.value.email,
          contactNo: this.signupForm.value.phone,
          companyName: this.signupForm.value.companyName,
          address: this.signupForm.value.address,
          userId: { userId: userResponse.userId },
        };

        console.log('Creating customer profile:', payloadCustomer);

        this.api.signupCustomer(payloadCustomer).subscribe({
          next: (customerResponse: any) => {
            console.log('Customer profile created:', customerResponse);
            this.isLoading = false;

            Swal.fire({
              title: 'Success!',
              text: 'Account created successfully',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              this.dialog.closeAll();
              const dialogRef = this.dialog.open(LoginComponent, {
                height: '1000px',
                width: '1000px',
              });
            });
          },
          error: (customerError: any) => {
            this.isLoading = false;
            console.error('Customer creation failed:', customerError);

            // Rollback user creation if customer creation fails
            this.api.deleteUser(userResponse.userId).subscribe({
              next: () => console.log('User rollback successful'),
              error: (rollbackError) =>
                console.error('Rollback failed:', rollbackError),
            });

            Swal.fire({
              title: 'Error!',
              text: 'Failed to create customer profile. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          },
        });
      },
      error: (userError: any) => {
        this.isLoading = false;
        console.error('User creation failed:', userError);

        Swal.fire({
          title: 'Error!',
          text:
            userError.error?.message ||
            'Failed to create user account. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });
    // Prepare payload for supplier registration
  }

  openLogin() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
    });
  }
}
