import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SupplierService } from '../supplier/service/supplier.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss'],
})
export class PaymentGatewayComponent {
  paymentForm!: FormGroup;
  total = 0;
  cardTypes = [
    { value: 'visa', display: 'Visa' },
    { value: 'mastercard', display: 'MasterCard' },
  ];
  userType: string = '';

  constructor(
    private fb: FormBuilder,
    private api: SupplierService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    public dialogRef: MatDialogRef<PaymentGatewayComponent>
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      name: ['', Validators.required],
      // expiry: [
      //   '',
      //   [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)],
      // ],
      expiry: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),
          this.futureExpiryValidator,
        ],
      ],
      cvn: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      cardType: ['visa', Validators.required],
    });
    console.log('editData', this.editData);

    if (this.editData.item && this.editData.stock) {
      this.total = this.editData.item.price * this.editData.stock;
      console.log(this.total);

      this.paymentForm.patchValue({
        amount: this.total.toFixed(2),
      });

    }else if(this.editData.type && this.editData.data){
      this.userType = this.editData.type;
      this.total = this.editData.data.totalAmount;
      this.paymentForm.patchValue({
        amount: this.total.toFixed(2),
      });
    }
  }

  submitPayment(): void {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }
    console.log('item-' + this.editData);
    // Swal.fire('Your Payment Processed Successfully');

    if (this.editData) {

      if(this.userType === 'Customer'){
        this.api.createorder(this.editData.data).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: 'Order Placed!',
              text: 'Your order has been successfully placed.',
              icon: 'success',
            });
            this.dialogRef.close();
          },
          error: (err: any) => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to place order. Please try again.',
              icon: 'error',
            });
            console.error('Order error:', err);
          },
        });
      }else{
        const orderData = {
          price: this.editData.item.price,
          itemCount: this.editData.stock,
          item_id: this.editData.item.supplierItemId,
          supplier_id: this.editData.item.supId,
          address: "NutriPaws , Malabe , Sri Lanka",
          OrderStatus: "Place",
          mobile_no: "011 254 4587",
        };

        console.log('Order item:', orderData);

        this.api.createSuplierorder(orderData).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: 'Order Placed!',
              text: 'Your order has been successfully placed.',
              icon: 'success',
            });
          },
          error: (err: any) => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to place order. Please try again.',
              icon: 'error',
            });
            console.error('Order error:', err);
          },
        });
      }

    } else {
      Swal.fire({
        title: 'Incomplete Information',
        text: 'Please fill in your address and mobile number.',
        icon: 'warning',
      });
    }

    this.dialogRef.close();
  }

  futureExpiryValidator(control: any): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
      return null; // Format already handled by pattern validator
    }

    const [month, year] = value.split('/').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return { expired: true };
    }

    return null;
  }
}
