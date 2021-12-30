// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
// import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular-highcharts'
//component
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LoginComponent } from './admin-login/login/login.component';
import { AuthGuard } from './admin-login/auth/auth.guard';
import { AuthInterceptor } from './admin-login/auth/auth.interceptor';
import { AdminService } from './service/admin.service';

//routes
// import { appRoutes } from './routes';

//Dachboard
import { HomeComponent } from './admin-dashboard/home/home.component';
import { OrderManagementComponent } from './admin-dashboard/order-management/order-management.component';
import { DriverManagementComponent } from './admin-dashboard/driver-management/driver-management.component';
import { UserManagementComponent } from './admin-dashboard/user-management/user-management.component';
import { VehicleManagementComponent } from './admin-dashboard/vehicle-management/vehicle-management.component';
import { SettingComponent } from './admin-dashboard/setting/setting.component';

//other
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsersComponent } from './admin-dashboard/user-management/users/users.component';
import { AddUserComponent } from './admin-dashboard/user-management/add-user/add-user.component';
import { OrderComponent } from './admin-dashboard/order-management/order/order.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DriverComponent } from './admin-dashboard/driver-management/driver/driver.component';
import { EditDriverProfileComponent } from './admin-dashboard/driver-management/view/view.component';
import { EditProfileComponent } from './admin-dashboard/user-management/edit-user/edit-user.component';
import { VehicleComponent } from './admin-dashboard/vehicle-management/vehicle/vehicle.component';
import { SahasaComponent } from './admin-dashboard/setting/sahasa/sahasa.component';
import { ViewComponent } from './admin-dashboard/order-management/view/view.component';
import { AddDriverComponent } from './admin-dashboard/driver-management/add-driver/add-driver.component';
import { AppRoutingModule } from './app-routing.module';
import { AddVehicleComponent } from './admin-dashboard/vehicle-management/add-vehicle/add-vehicle.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    LoginComponent,
    HomeComponent,
    OrderManagementComponent,
    DriverManagementComponent,
    UserManagementComponent,
    OrderComponent,
    AdminDashboardComponent,
    DriverComponent,
    EditDriverProfileComponent,
    EditProfileComponent,
    UsersComponent,
    AddUserComponent,
    VehicleManagementComponent,
    SettingComponent,
    VehicleComponent,
    SahasaComponent,
    ViewComponent,
    AddDriverComponent,
    AddVehicleComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ChartModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
