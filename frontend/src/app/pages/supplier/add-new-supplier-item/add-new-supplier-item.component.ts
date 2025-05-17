import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SupplierService } from '../service/supplier.service';

@Component({
  selector: 'app-add-new-supplier-item',
  templateUrl: './add-new-supplier-item.component.html',
  styleUrls: ['./add-new-supplier-item.component.scss'],
})
export class AddNewSupplierItemComponent {
  materialForm!: FormGroup;
  categories: any[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddNewSupplierItemComponent>,
    private api: SupplierService,
    @Inject(MAT_DIALOG_DATA) public data: any // Accept item data for editing
  ) {}

  ngOnInit() {
    // Initialize form
    this.materialForm = this.fb.group({
      itemName: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      stock: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      price: [
        '',
        [Validators.required, Validators.pattern('^[1-9]+(.[0-9]{1,2})?$')],
      ],
    });

    this.fetchCategories();

    // If editing, patch form with existing data
    if (this.data) {
      this.materialForm.patchValue({
        itemName: this.data.itemName,
        category: this.data.categoryId,
        description: this.data.description,
        stock: this.data.stock,
        price: this.data.price,
      });

      // Optional: preload existing image if needed
      // this.selectedFile = this.data.image;
    }
  }

  fetchCategories() {
    this.api.getAllCategories().subscribe({
      next: (res: any) => {
        if (res && Array.isArray(res)) {
          this.categories = res.map((category) => ({
            categoryId: category.categoryId,
            name: category.name,
          }));
        }
      },
      error: (err: any) => {
        Swal.fire('Error While Fetching Categories');
      },
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.materialForm.valid) {
      const formJson = {
        itemName: this.materialForm.value.itemName,
        categoryId: this.materialForm.value.category,
        description: this.materialForm.value.description,
        stock: this.materialForm.value.stock,
        price: this.materialForm.value.price,
        supId: localStorage.getItem('userId'),
        // image: this.selectedFile
        //   ? this.selectedFile.name
        //   : this.data?.image || null,
        emgUrl :'/assets/uploads/image1.jpg'
      };

      const jsonData = JSON.stringify(formJson);

      if (this.data) {
        console.log("item data -" + JSON.stringify(this.data));
        // Edit mode: update existing item
        this.api.updateItem(this.data.supplierItemId, jsonData).subscribe({
          next: (res: any) => {
            Swal.fire('Item Updated Successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            Swal.fire('Error while updating item');
          },
        });
      } else {
        // Add mode: create new item
        if (this.selectedFile) {
          this.api.uploadItem(jsonData).subscribe({
            next: (res: any) => {
              Swal.fire('Item Added Successfully');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              Swal.fire('Error while adding item');
            },
          });
        } else {
          Swal.fire('Please select an image.');
        }
      }
    } else {
      Swal.fire('Please fill all required fields.');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
