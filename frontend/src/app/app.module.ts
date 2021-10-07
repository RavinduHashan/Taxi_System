// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { driverRoutes } from './driver/driverRoutes';
import { customerRoutes } from './customer/customerRoutes';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { DriverComponent } from './driver/driver.component';
import { ProfileComponent } from './profile/profile.component';
import { NewComponent } from './orders/new/new.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { DriverProfileComponent } from './driver/driver-profile/driver-profile.component';
import { OnlineDriverComponent } from './customer/online-driver/online-driver.component';
import { OnlineComponent } from './driver/online/online.component';
import { TripComponent } from './customer/trip/trip.component';
import { ResponseComponent } from './customer/response/response.component';
import { TripOrderComponent } from './driver/trip-order/trip-order.component';
import { HistoryComponent } from './driver/history/history.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    OrdersComponent,
    DriverComponent,
    ProfileComponent,
    NewComponent,
    UserDashboardComponent,
    CustomerComponent,
    CustomerProfileComponent,
    DriverProfileComponent,
    OnlineDriverComponent,
    OnlineComponent,
    TripComponent,
    ResponseComponent,
    TripOrderComponent,
    HistoryComponent, 
  ],

  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    RouterModule.forRoot(driverRoutes),
    RouterModule.forRoot(customerRoutes),
    HttpClientModule,
    NgbModule,
      
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
