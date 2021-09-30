// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
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
import { PendingComponent } from './orders/pending/pending.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { DriverProfileComponent } from './driver/driver-profile/driver-profile.component';





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
    PendingComponent,
    UserDashboardComponent,
    CustomerComponent,
    CustomerProfileComponent,
    DriverProfileComponent
   
    
    
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
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
