import { Routes } from '@angular/router';
import { AuthGuard } from './admin-login/auth/auth.guard';

//Admin Login
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LoginComponent } from './admin-login/login/login.component';

//Dashboard
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

//Home
import { HomeComponent } from './admin-dashboard/home/home.component';

//Order Management
import { OrderManagementComponent } from './admin-dashboard/order-management/order-management.component';
import { NewComponent } from './admin-dashboard/order-management/new/new.component';
import { EditOrdersComponent } from './admin-dashboard/order-management/editOrders/editOrders.component';
import { ViewComponent } from './admin-dashboard/order-management/view/view.component';

//Vehicle Management
import { VehicleManagementComponent } from './admin-dashboard/vehicle-management/vehicle-management.component';
import { VehicleComponent } from './admin-dashboard/vehicle-management/vehicle/vehicle.component';
import { EditVehiclesComponent } from './admin-dashboard/vehicle-management/edit-vehicles/edit-vehicles.component';
import { AddVehicleComponent } from './admin-dashboard/vehicle-management/add-vehicle/add-vehicle.component';


//Driver Management
import { DriverManagementComponent } from './admin-dashboard/driver-management/driver-management.component';
import { DriverProfileComponent } from './admin-dashboard/driver-management/driver-profile/driver-profile.component';
import { AvailableComponent } from './admin-dashboard/driver-management/available/available.component';
import { TripOrderComponent } from './admin-dashboard/driver-management/trip-order/trip-order.component';
import { HistoryComponent } from './admin-dashboard/driver-management/history/history.component';
import { EditDriverProfileComponent } from './admin-dashboard/driver-management/edit-driver-profile/edit-driver-profile.component';

//User Management
import { UserManagementComponent } from './admin-dashboard/user-management/user-management.component';
import { UsersComponent } from './admin-dashboard/user-management/users/users.component';
import { AddComponent } from './admin-dashboard/user-management/add/add.component';
import { EditProfileComponent } from './admin-dashboard/user-management/edit-profile/edit-profile.component';

//Setting
import { SettingComponent } from './admin-dashboard/setting/setting.component';
import { SahasaComponent } from './admin-dashboard/setting/sahasa/sahasa.component';


export const appRoutes: Routes = [
    //Admin Login
    {
        path: 'admin-login', component: AdminLoginComponent,
        children: [{ path: '', component: LoginComponent }]
    },
    //Dashboard
    {
        path: 'dashboard', component: AdminDashboardComponent,
        children: [
                  //Home
                  {
                    path: '', component: HomeComponent, canActivate: [AuthGuard]
                  },
                  //Order Management
                  {
                    path: 'order-management', component: OrderManagementComponent,
                    children:
                            [
                              { path: '', component: NewComponent, canActivate: [AuthGuard] },
                              { path: 'edit/:id', component: EditOrdersComponent, canActivate: [AuthGuard]  },
                              { path: 'view/:id', component: ViewComponent, canActivate: [AuthGuard]  }
                            ],
                    canActivate: [AuthGuard]
                  },
                  //Vehicle Management
                  {
                    path: 'vehicle-management', component: VehicleManagementComponent,
                    children:
                            [
                              { path: 'vehicle', component: VehicleComponent, canActivate: [AuthGuard] },
                              { path: 'edit/:id', component: EditVehiclesComponent, canActivate: [AuthGuard] },
                              { path: 'add', component: AddVehicleComponent, canActivate: [AuthGuard] }
                            ],
                    canActivate: [AuthGuard]
                  },
                  //Driver Management
                  {
                    path: 'driver-management', component: DriverManagementComponent,
                    children:
                            [
                              { path: 'profile', component: DriverProfileComponent, canActivate: [AuthGuard] },
                              { path: 'available', component: AvailableComponent, canActivate: [AuthGuard] },
                              { path: 'trip-order', component: TripOrderComponent, canActivate: [AuthGuard] },
                              { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
                              { path: 'edit/:id', component: EditDriverProfileComponent, canActivate: [AuthGuard]  }
                            ],
                    canActivate: [AuthGuard]
                  },
                  //User Management
                  {
                    path: 'user-management', component: UserManagementComponent,
                    children:
                            [
                              { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
                              { path: 'add', component: AddComponent, canActivate: [AuthGuard] },
                              { path: 'edit/:id', component: EditProfileComponent, canActivate: [AuthGuard]}
                            ],
                     canActivate: [AuthGuard]
                  },
                  //Setting
                  {
                    path: 'setting', component: SettingComponent,
                    children:
                            [
                              { path: 'sahasa', component: SahasaComponent, canActivate: [AuthGuard] },
                            ],
                    canActivate: [AuthGuard]
                  },

                  ],
                  canActivate: [AuthGuard]
    },
    //Redirect to admin login
    {
    path: '', redirectTo: '/admin-login', pathMatch: 'full'
    },

];
