import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AlertComponent } from './pages/alert/alert.component';
import { LoginComponent } from './pages/login/login.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomerViewComponent } from './pages/customer/customer-view/customer-view.component';
import { CustomerNavComponent } from './pages/navbar/customer-nav/customer-nav.component';
import { CartDialogComponent } from './pages/cart-dialog/cart-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SecoondNavComponent } from './pages/navbar/secoond-nav/secoond-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { InventoryDashboardComponent } from './pages/inventory/inventory-dashboard/inventory-dashboard.component';
import { OrdersPaymentsDashboardComponent } from './pages/orders_payments/orders-payments-dashboard/orders-payments-dashboard.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SupplierViewComponent } from './pages/supplier/supplier-view/supplier-view.component';
import { AddNewItemDialogComponent } from './pages/inventory/add-new-item-dialog/add-new-item-dialog.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ManageInventoryComponent } from './pages/inventory/manage-inventory/manage-inventory.component';
import { InHouseOrdersComponent } from './pages/inventory/in-house-orders/in-house-orders.component';
import { CustomerOrdersComponent } from './pages/inventory/customer-orders/customer-orders.component';
import { AddNewSupplierItemComponent } from './pages/supplier/add-new-supplier-item/add-new-supplier-item.component';
import { OrdersPageComponent } from './pages/supplier/orders-page/orders-page.component';
import { SystemPaymentsComponent } from './pages/orders_payments/system-payments/system-payments.component';
import { SystemUsersComponent } from './pages/orders_payments/system-users/system-users.component';
import { InHouseOrderManageComponent } from './pages/orders_payments/in-house-order-manage/in-house-order-manage.component';
import { CategoryLsitComponent } from './pages/orders_payments/category-lsit/category-lsit.component';
import { AddNewCategoryComponent } from './pages/orders_payments/category-lsit/add-new-category/add-new-category.component';
import { FooterComponent } from './pages/footer-section/footer/footer.component';
import { QuantityDialogComponent } from './pages/quantity-dialog/quantity-dialog.component';
import { ProfileComponentComponent } from './pages/profile-component/profile-component.component';
import { ConfirmDialogComponentComponent } from './pages/confirm-dialog-component/confirm-dialog-component.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotificationDialogComponent } from './pages/inventory/inventory-dashboard/notification-dialog/notification-dialog.component';
import { UpdateStockComponent } from './pages/inventory/inventory-dashboard/update-stock/update-stock.component';
import { AddNewUserComponent } from './pages/orders_payments/system-users/add-new-user/add-new-user.component';
import { UserRolesComponent } from './pages/orders_payments/user-roles/user-roles.component';
import { AddNewRoleComponent } from './pages/orders_payments/user-roles/add-new-role/add-new-role.component';
import { SupplierNavComponent } from './pages/navbar/supplier-nav/supplier-nav.component';
import { SupplierProfileComponent } from './pages/supplier/supplier-profile/supplier-profile.component';
import { SupplierSignupComponent } from './pages/supplier/supplier-signup/supplier-signup.component';
import { ViewItemDialogComponent } from './pages/supplier/view-item-dialog/view-item-dialog.component';
import { ItemListComponent } from './pages/orders_payments/item-list/item-list.component';
import { PaymentGatewayComponent } from './pages/payment-gateway/payment-gateway.component';
import { InventoryReportComponent } from './pages/inventory/inventory-report/inventory-report.component';
import { MatTabsModule } from '@angular/material/tabs';
import { OwnOrdersComponent } from './pages/customer/own-orders/own-orders.component';
import { CustomerReportsComponent } from './pages/customer/customer-reports/customer-reports.component';
import { SupplierOrdersComponent } from './pages/supplier/supplier-orders/supplier-orders.component';
import { AdminReportsComponent } from './pages/orders_payments/admin-reports/admin-reports.component';
import { CustomerComponentNewComponent } from './pages/orders_payments/customer-component-new/customer-component-new.component';
import { SupplierOrderNewComponent } from './pages/orders_payments/supplier-order-new/supplier-order-new.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SupplierReportsComponent } from './pages/supplier/supplier-reports/supplier-reports.component';
import { CustomerPaymentsComponent } from './pages/orders_payments/customer-payments/customer-payments.component';
import { SupplierPaymentsComponent } from './pages/orders_payments/supplier-payments/supplier-payments.component';
import { SupAlertComponent } from './pages/supplier/sup-alert/sup-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AlertComponent,
    LoginComponent,
    CustomerViewComponent,
    CustomerNavComponent,
    CartDialogComponent,
    SecoondNavComponent,
    InventoryDashboardComponent,
    OrdersPaymentsDashboardComponent,
    SupplierViewComponent,
    AddNewItemDialogComponent,
    ManageInventoryComponent,
    InHouseOrdersComponent,
    CustomerOrdersComponent,
    AddNewSupplierItemComponent,
    OrdersPageComponent,
    SystemPaymentsComponent,
    SystemUsersComponent,
    InHouseOrderManageComponent,
    CategoryLsitComponent,
    AddNewCategoryComponent,
    FooterComponent,
    QuantityDialogComponent,
    ProfileComponentComponent,
    ConfirmDialogComponentComponent,
    SignupComponent,
    NotificationDialogComponent,
    UpdateStockComponent,
    AddNewUserComponent,
    UserRolesComponent,
    AddNewRoleComponent,
    SupplierNavComponent,
    SupplierProfileComponent,
    SupplierSignupComponent,
    ViewItemDialogComponent,
    ItemListComponent,
    PaymentGatewayComponent,
    InventoryReportComponent,
    OwnOrdersComponent,
    CustomerReportsComponent,
    SupplierOrdersComponent,
    AdminReportsComponent,
    CustomerComponentNewComponent,
    SupplierOrderNewComponent,
    SupplierReportsComponent,
    CustomerPaymentsComponent,
    SupplierPaymentsComponent,
    SupAlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTabsModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
