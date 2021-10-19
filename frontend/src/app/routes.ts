import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { AdminComponent } from './admin/admin.component';
import { SignUpComponent } from './admin/sign-up/sign-up.component';
import { SignInComponent } from './admin/sign-in/sign-in.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { DriverComponent } from './driver/driver.component';
import { CustomerComponent } from './customer/customer.component';
import { ProfileComponent } from './profile/profile.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: AdminComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: AdminComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]
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
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];
