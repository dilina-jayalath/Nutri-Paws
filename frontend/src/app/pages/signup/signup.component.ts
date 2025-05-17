import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/environments/custom-validators';
import { LoginComponent } from '../login/login.component';
import { SignupService } from './service/signup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private api: SignupService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
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
        address: ['', [Validators.required]],
        contactNumber: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)],
        ],
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

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onSignup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      console.warn('Form is invalid:', this.signupForm.errors);
      return;
    }

    this.isLoading = true;

    // Prepare payloads
    const payloadUser = {
      userName: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      userRolId: { roleId: 1 }, // Default role for customer
    };

    console.log('Creating user login:', payloadUser);

    this.api.createUserLogin(payloadUser).subscribe({
      next: (userResponse: any) => {
        console.log('User created successfully:', userResponse);

        // Use the actual user ID from the response
        const payloadCustomer = {
          userId: { userId: userResponse.userId }, // Use the returned userId
          address: this.signupForm.value.address,
          contactNo: this.signupForm.value.contactNumber,
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
  }

  openLogin() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '1000px',
      width: '1000px',
    });
  }
}
