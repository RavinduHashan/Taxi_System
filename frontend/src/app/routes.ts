import { Routes } from '@angular/router';
import { AuthGuard } from './admin-login/auth/auth.guard';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LoginComponent } from './admin-login/login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './admin-dashboard/home/home.component';
import { ProfileComponent } from './admin-dashboard/profile/profile.component';

import { CustomerComponent } from './admin-dashboard/customer/customer.component';

import { CreateOrderComponent } from './admin-dashboard/customer/create-order/create-order.component';
import { AvailableDriverComponent } from './admin-dashboard/customer/available-driver/available-driver.component';
import { ResponseComponent } from './admin-dashboard/customer/response/response.component';
import { CustomerProfileComponent } from './admin-dashboard/customer/customer-profile/customer-profile.component';
import { EditCustomerProfileComponent } from './admin-dashboard/customer/edit-customer-profile/edit-customer-profile.component';

import { DriverComponent } from './admin-dashboard/driver/driver.component';

import { DriverProfileComponent } from './admin-dashboard/driver/driver-profile/driver-profile.component';
import { AvailableComponent } from './admin-dashboard/driver/available/available.component';
import { TripOrderComponent } from './admin-dashboard/driver/trip-order/trip-order.component';
import { HistoryComponent } from './admin-dashboard/driver/history/history.component';
import { EditDriverProfileComponent } from './admin-dashboard/driver/edit-driver-profile/edit-driver-profile.component';

import { OrdersComponent } from './admin-dashboard/orders/orders.component';

import { NewComponent } from './admin-dashboard/orders/new/new.component';


export const appRoutes: Routes = [
    {
        path: 'admin-login', component: AdminLoginComponent,
        children: [{ path: '', component: LoginComponent }]
    },
    {
        path: 'dashboard', component: AdminDashboardComponent,
        children: [
                  {path: 'dashboard/home', component: HomeComponent, canActivate: [AuthGuard]},

                  {
                    path: 'dashboard/orders', component: OrdersComponent,
                    children:
                            [
                              { path: 'dashboard/orders/orders', component: NewComponent, canActivate: [AuthGuard] },
                            ],
                    canActivate: [AuthGuard]},

                  {
                    path: 'dashboard/customer', component: CustomerComponent,
                    children:[
                             { path: 'dashboard/customer/create-order', component: CreateOrderComponent, canActivate: [AuthGuard] },
                             { path: 'dashboard/customer/available-driver', component: AvailableDriverComponent, canActivate: [AuthGuard] },
                             { path: 'dashboard/customer/response', component: ResponseComponent, canActivate: [AuthGuard]},
                             { path: 'dashboard/customer/profile', component: CustomerProfileComponent, canActivate: [AuthGuard] },
                             { path: 'dashboard/customer/profile/:id', component: EditCustomerProfileComponent, canActivate: [AuthGuard] }
                             ],
                    canActivate: [AuthGuard]
                  },

                  {
                    path: 'dashboard/driver', component: DriverComponent,
                    children:
                            [
                              { path: 'dashboard/driver/profile', component: DriverProfileComponent, canActivate: [AuthGuard] },
                              { path: 'dashboard/driver/available', component: AvailableComponent, canActivate: [AuthGuard] },
                              { path: 'dashboard/driver/trip-order', component: TripOrderComponent, canActivate: [AuthGuard] },
                              { path: 'dashboard/driver/history', component: HistoryComponent, canActivate: [AuthGuard] },
                              { path: 'dashboard/driver/edit/:id', component: EditDriverProfileComponent, canActivate: [AuthGuard]  }
                            ],
                    canActivate: [AuthGuard]
                  },

                  {path: 'dashboard/profile', component: ProfileComponent, canActivate: [AuthGuard]},
                  ], canActivate: [AuthGuard]
    },
    {
      path: '', redirectTo: '/admin-login', pathMatch: 'full'
    }
];
