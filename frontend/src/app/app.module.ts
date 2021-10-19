// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// components
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { SignUpComponent } from './admin/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { driverRoutes } from './driver/driverRoutes';
import { customerRoutes } from './customer/customerRoutes';
import { orderRoutes } from './orders/orderRoutes';
import { SignInComponent } from './admin/sign-in/sign-in.component';
import { AdminService } from './shared/admin.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { DriverComponent } from './driver/driver.component';
import { ProfileComponent } from './profile/profile.component';
import { NewComponent } from './orders/new/new.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { DriverProfileComponent } from './driver/driver-profile/driver-profile.component';
import { AvailableDriverComponent } from './customer/available-driver/available-driver.component';
import { AvailableComponent } from './driver/available/available.component';
import { ResponseComponent } from './customer/response/response.component';
import { TripOrderComponent } from './driver/trip-order/trip-order.component';
import { HistoryComponent } from './driver/history/history.component';
import { CreateOrderComponent } from './customer/create-order/create-order.component';
import { EditComponent } from './orders/edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SignUpComponent,
    SignInComponent,
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
    EditComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    RouterModule.forRoot(driverRoutes),
    RouterModule.forRoot(customerRoutes),
    RouterModule.forRoot(orderRoutes),
    HttpClientModule,
    NgbModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
