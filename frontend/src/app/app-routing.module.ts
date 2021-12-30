import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { OrderComponent } from './admin-dashboard/order-management/order/order.component';
import { ViewComponent } from './admin-dashboard/order-management/view/view.component';

//Vehicle Management
import { VehicleManagementComponent } from './admin-dashboard/vehicle-management/vehicle-management.component';
import { VehicleComponent } from './admin-dashboard/vehicle-management/vehicle/vehicle.component';
import { AddVehicleComponent } from './admin-dashboard/vehicle-management/add-vehicle/add-vehicle.component';

//Driver Management
import { DriverManagementComponent } from './admin-dashboard/driver-management/driver-management.component';
import { DriverComponent } from './admin-dashboard/driver-management/driver/driver.component';
import { EditDriverProfileComponent } from './admin-dashboard/driver-management/view/view.component';
import { AddDriverComponent } from './admin-dashboard/driver-management/add-driver/add-driver.component';

//User Management
import { UserManagementComponent } from './admin-dashboard/user-management/user-management.component';
import { UsersComponent } from './admin-dashboard/user-management/users/users.component';
import { AddUserComponent } from './admin-dashboard/user-management/add-user/add-user.component';
import { EditProfileComponent } from './admin-dashboard/user-management/edit-user/edit-user.component';

//Setting
import { SettingComponent } from './admin-dashboard/setting/setting.component';
import { SahasaComponent } from './admin-dashboard/setting/sahasa/sahasa.component';


const routes: Routes = [
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
                              { path: '', component: OrderComponent, canActivate: [AuthGuard] },
                              { path: 'view/:id', component: ViewComponent, canActivate: [AuthGuard]  }
                            ],
                    canActivate: [AuthGuard]
                  },
                  //Vehicle Management
                  {
                    path: 'vehicle-management', component: VehicleManagementComponent,
                    children:
                            [
                              { path: '', component: VehicleComponent, canActivate: [AuthGuard] },
                              { path: 'add-vehicle', component: AddVehicleComponent, canActivate: [AuthGuard] }

                            ],
                    canActivate: [AuthGuard]
                  },
                  //Driver Management
                  {
                    path: 'driver-management', component: DriverManagementComponent,
                    children:
                            [
                              { path: '', component: DriverComponent, canActivate: [AuthGuard] },
                              { path: 'view/:id', component: EditDriverProfileComponent, canActivate: [AuthGuard]  },
                              { path: 'add-driver', component: AddDriverComponent, canActivate: [AuthGuard] }

                            ],
                    canActivate: [AuthGuard]
                  },
                  //User Management
                  {
                    path: 'user-management', component: UserManagementComponent,
                    children:
                            [
                              { path: '', component: UsersComponent, canActivate: [AuthGuard] },
                              { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] },
                              { path: 'edit/:id', component: EditProfileComponent, canActivate: [AuthGuard]}
                            ],
                    canActivate: [AuthGuard]
                  },
                  //Setting
                  {
                    path: 'setting', component: SettingComponent,
                    children:
                            [
                              { path: '', component: SahasaComponent, canActivate: [AuthGuard] },
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
