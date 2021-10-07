import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { DriverComponent } from './driver/driver.component';
import { CustomerComponent } from './customer/customer.component';
import { ProfileComponent } from './profile/profile.component';
import { NewComponent } from './orders/new/new.component';
import { DriverProfileComponent } from './driver/driver-profile/driver-profile.component';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { OnlineComponent } from './driver/online/online.component';
import { TripComponent } from './customer/trip/trip.component';
import { OnlineDriverComponent } from './customer/online-driver/online-driver.component';
import { ResponseComponent } from './customer/response/response.component';
import { TripOrderComponent } from './driver/trip-order/trip-order.component';
import { HistoryComponent } from './driver/history/history.component';


export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'dashboard', component: UserDashboardComponent, canActivate: [AuthGuard]
    },
    {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard]
    },
    {
        path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]
    },

    {
        path: 'driver', component: DriverComponent, canActivate: [AuthGuard]
    },
    
    {
        path: 'customer', component: CustomerComponent, canActivate: [AuthGuard]
    },
    {
        path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
    },
    {
        path: 'new', component: OrdersComponent,
        children: [{ path: '', component: NewComponent }], canActivate: [AuthGuard]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];