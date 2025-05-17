import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { CustomerViewComponent } from './pages/customer/customer-view/customer-view.component';
import { InventoryDashboardComponent } from './pages/inventory/inventory-dashboard/inventory-dashboard.component';
import { OrdersPaymentsDashboardComponent } from './pages/orders_payments/orders-payments-dashboard/orders-payments-dashboard.component';
import { SupplierViewComponent } from './pages/supplier/supplier-view/supplier-view.component';
import { ManageInventoryComponent } from './pages/inventory/manage-inventory/manage-inventory.component';
import { InHouseOrdersComponent } from './pages/inventory/in-house-orders/in-house-orders.component';
import { CustomerOrdersComponent } from './pages/inventory/customer-orders/customer-orders.component';
import { OrdersPageComponent } from './pages/supplier/orders-page/orders-page.component';
import { InHouseOrderManageComponent } from './pages/orders_payments/in-house-order-manage/in-house-order-manage.component';
import { SystemPaymentsComponent } from './pages/orders_payments/system-payments/system-payments.component';
import { CategoryLsitComponent } from './pages/orders_payments/category-lsit/category-lsit.component';
import { ProfileComponentComponent } from './pages/profile-component/profile-component.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SystemUsersComponent } from './pages/orders_payments/system-users/system-users.component';
import { UserRolesComponent } from './pages/orders_payments/user-roles/user-roles.component';
import { SupplierProfileComponent } from './pages/supplier/supplier-profile/supplier-profile.component';
import { SupplierSignupComponent } from './pages/supplier/supplier-signup/supplier-signup.component';
import { ItemListComponent } from './pages/orders_payments/item-list/item-list.component';
import { InventoryReportComponent } from './pages/inventory/inventory-report/inventory-report.component';
import { OwnOrdersComponent } from './pages/customer/own-orders/own-orders.component';
import { CustomerReportsComponent } from './pages/customer/customer-reports/customer-reports.component';
import { SupplierOrdersComponent } from './pages/supplier/supplier-orders/supplier-orders.component';
import { AdminReportsComponent } from './pages/orders_payments/admin-reports/admin-reports.component';
import { CustomerComponentNewComponent } from './pages/orders_payments/customer-component-new/customer-component-new.component';
import { SupplierOrderNewComponent } from './pages/orders_payments/supplier-order-new/supplier-order-new.component';
import { SupplierReportsComponent } from './pages/supplier/supplier-reports/supplier-reports.component';
import { CustomerPaymentsComponent } from './pages/orders_payments/customer-payments/customer-payments.component';
import { SupplierPaymentsComponent } from './pages/orders_payments/supplier-payments/supplier-payments.component';

// ROUTE PATHS
const routes: Routes = [
  { path: '', redirectTo: '/customer', pathMatch: 'full' },
  { path: 'customer', component: CustomerViewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'stores', component: InventoryDashboardComponent },
  { path: 'order-payments', component: OrdersPaymentsDashboardComponent },
  { path: 'supplier', component: SupplierViewComponent },
  { path: 'manage-inventory', component: ManageInventoryComponent },
  { path: 'in-house-orders', component: InHouseOrdersComponent },
  { path: 'customer-orders', component: CustomerOrdersComponent },
  { path: 'customer-orders-new', component: CustomerComponentNewComponent },
  { path: 'supplier-orders-new', component: SupplierOrderNewComponent },
  { path: 'supplier-orders', component: OrdersPageComponent },
  { path: 'own-supplier-orders', component: SupplierOrdersComponent },
  { path: 'order-details', component: InHouseOrderManageComponent },
  { path: 'payments', component: SystemPaymentsComponent },
  { path: 'order-categories', component: CategoryLsitComponent },
  { path: 'profile', component: ProfileComponentComponent },
  { path: 'supplier-profile', component: SupplierProfileComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'supplier-signup', component: SupplierSignupComponent },
  { path: 'system-users', component: SystemUsersComponent },
  { path: 'user-roles', component: UserRolesComponent },
  { path: 'item-list', component: ItemListComponent },
  { path: 'inventory-report', component: InventoryReportComponent },
  { path: 'own-orders', component: OwnOrdersComponent },
  { path: 'cus-report', component: CustomerReportsComponent },
  { path: 'sup-report', component: SupplierReportsComponent },
  { path: 'customer-payments', component: CustomerPaymentsComponent },
  { path: 'supplier-payments', component: SupplierPaymentsComponent },
  { path: 'admin-reports', component: AdminReportsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
