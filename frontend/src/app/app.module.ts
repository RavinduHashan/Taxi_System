// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//component
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LoginComponent } from './admin-login/login/login.component';
import { AuthGuard } from './admin-login/auth/auth.guard';
import { AuthInterceptor } from './admin-login/auth/auth.interceptor';

import { HomeComponent } from './admin-dashboard/home/home.component';
import { OrdersComponent } from './admin-dashboard/orders/orders.component';
import { DriverComponent } from './admin-dashboard/driver/driver.component';
import { ProfileComponent } from './admin-dashboard/profile/profile.component';
import { NewComponent } from './admin-dashboard/orders/new/new.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CustomerComponent } from './admin-dashboard/customer/customer.component';
import { CustomerProfileComponent } from './admin-dashboard/customer/customer-profile/customer-profile.component';
import { DriverProfileComponent } from './admin-dashboard/driver/driver-profile/driver-profile.component';
import { AvailableDriverComponent } from './admin-dashboard/customer/available-driver/available-driver.component';
import { AvailableComponent } from './admin-dashboard/driver/available/available.component';
import { ResponseComponent } from './admin-dashboard/customer/response/response.component';
import { TripOrderComponent } from './admin-dashboard/driver/trip-order/trip-order.component';
import { HistoryComponent } from './admin-dashboard/driver/history/history.component';
import { CreateOrderComponent } from './admin-dashboard/customer/create-order/create-order.component';
import { EditOrdersComponent } from './admin-dashboard/orders/editOrders/editOrders.component';
import { EditCustomerProfileComponent } from './admin-dashboard/customer/edit-customer-profile/edit-customer-profile.component';
import { EditDriverProfileComponent } from './admin-dashboard/driver/edit-driver-profile/edit-driver-profile.component';
import { EditAdminProfileComponent } from './admin-dashboard/profile/edit-admin-profile/edit-admin-profile.component';

//routes
import { appRoutes } from './routes';
import { driverRoutes } from './admin-dashboard/driver/driverRoutes';
import { ordersRoutes } from './admin-dashboard/orders/ordersRoutes';

import { AdminService } from './shared/admin.service';

//other
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    LoginComponent,
    HomeComponent,
    OrdersComponent,
    DriverComponent,
    ProfileComponent,
    NewComponent,
    AdminDashboardComponent,
    CustomerComponent,
    CustomerProfileComponent,
    DriverProfileComponent,
    AvailableDriverComponent,
    AvailableComponent,
    ResponseComponent,
    TripOrderComponent,
    HistoryComponent,
    CreateOrderComponent,
    EditOrdersComponent,
    EditCustomerProfileComponent,
    EditDriverProfileComponent,
    EditAdminProfileComponent

  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    RouterModule.forRoot(ordersRoutes),
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
