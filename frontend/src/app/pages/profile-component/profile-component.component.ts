import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponentComponent } from '../confirm-dialog-component/confirm-dialog-component.component';
import { ProfileComponentServiceService } from './service/profile-component-service.service';
import Swal from 'sweetalert2';
import { CustomerViewComponent } from '../customer/customer-view/customer-view.component';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.component.html',
  styleUrls: ['./profile-component.component.scss'],
})
export class ProfileComponentComponent implements OnInit {
  profileForm: FormGroup;
  userData: any;
  isEditing = false;
  showCurrentPassword = false;
  customerId: number;
  userId: number;
  passwordNew: String = '';

  isLoading = false; // Set to false since we're using static data
  profileImage: string | ArrayBuffer | null =
    'assets/images/default-avatar.png';
  selectedFile: File | null = null;

  constructor(
    private api: ProfileComponentServiceService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.profileForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
        email: ['', [Validators.required, Validators.email]],
        // phone: [
        //   '+94 (71) 574-6038',
        //   [
        //     Validators.required,
        //     Validators.pattern(/^\+?[0-9]{1,4}?[-.\s]?(\(?\d{3}\)?)[-.\s]?\d{3}[-.\s]?\d{4}$/)
        //   ]
        // ],
        phone: [
          '+94 (71) 574-6038',
          [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
        ],
        address: ['', [Validators.required]],
        currentPassword: [''],
        newPassword: [
          '',
          [
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/
            ),
          ],
        ],
        confirmPassword: [''],
      },
      { validator: this.passwordMatchValidator }
    );
    // Get customer ID from localStorage and convert to number
    const storedId = localStorage.getItem('customerId');
    const storedUserId = localStorage.getItem('userId');
    this.customerId = storedId ? parseInt(storedId, 10) : 0;
    this.userId = storedUserId ? parseInt(storedUserId, 10) : 0;
    console.log('user id - ' + this.userId);
    console.log('customerId id - ' + this.customerId);
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.api.getCustomerByCusId(this.customerId).subscribe(
      (response: any) => {
        if (response) {
          console.log('response - ' + JSON.stringify(response));
          this.profileForm.patchValue({
            name: response.userId.userName || '',
            email: response.userId.email || '',
            phone: response.contactNo || '',
            address: response.address || '',
            currentPassword: response.userId.password || '',
          });
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching customer data:', error);
        this.isLoading = false;
      }
    );
    this.userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Anytown, USA',
      bio: 'Pet lover and nutrition enthusiast. Passionate about providing the best for my furry friends!',
      profileImage: 'assets/images/default-avatar.png',
    };
    this.profileForm.patchValue(this.userData);
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.profileForm.patchValue(this.userData);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage =
          e.target?.result || 'assets/images/default-avatar.png';
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile(): void {
    if (this.profileForm.invalid) return;

    // In a real app, you would send this to your backend
    this.userData = {
      ...this.userData,
      ...this.profileForm.value,
      profileImage: this.profileImage,
    };
    // Only add password fields if a new password is provided
    this.profileForm.value.newPassword
      ? (this.passwordNew = this.profileForm.value.newPassword)
      : (this.passwordNew = this.profileForm.value.currentPassword);

    var userUpdate = {
      userName: this.profileForm.value.name,
      email: this.profileForm.value.email,
      password: this.passwordNew,
      userRollId: 1,
    };

    this.api.updateUser(userUpdate, this.userId).subscribe({
      next: (userResponse: any) => {
        console.log('Updating user login:', userResponse);

        var customerUpdate = {
          address: this.profileForm.value.address,
          contactNo: this.profileForm.value.phone,
        };

        this.api.updateCustomer(customerUpdate, this.customerId).subscribe({
          next: (customerResponse: any) => {
            console.log('Updating customer details:', customerResponse);
            this.isLoading = false;

            Swal.fire({
              title: 'Success!',
              text: 'Account edit successfully',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              this.dialog.closeAll();
            });
          },
          error: (customerError: any) => {
            this.isLoading = false;
            console.error('Customer edit failed:', customerError);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to edit customer profile. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          },
        });
      },
      error: (userError: any) => {
        this.isLoading = false;
        console.error('User edit failed:', userError);

        Swal.fire({
          title: 'Error!',
          text:
            userError.error?.message ||
            'Failed to edit user account. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });

    this.isEditing = false;
    // Show success message in a real app
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      width: '350px',
      data: {
        title: 'Delete Account',
        message:
          'Are you sure you want to delete your account? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteAccount();
      }
    });
  }

  deleteAccount(): void {
    this.api.deleteCustomerAcc(this.customerId).subscribe(
      (response) => {
        console.log('Customerv Account deleted:', response);
        this.api.deleteAcc(this.userId).subscribe(
          (response) => {
            console.log('User Account deleted:', response);
            // Safely access response properties
            const user = '';

            localStorage.setItem('isLoggedIn', 'false');
            localStorage.setItem('userId', user);
            localStorage.setItem('userRole', user);
            localStorage.setItem('rolename', user);
            localStorage.setItem('customerId', user);

            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Error deleting user account:', error);
          }
        );
      },
      (error) => {
        console.error('Error deleting customer account:', error);
      }
    );
  }
}
