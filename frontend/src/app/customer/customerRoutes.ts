import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { CustomerComponent } from './customer.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { TripComponent } from './trip/trip.component';
import { OnlineDriverComponent } from './online-driver/online-driver.component';
import { ResponseComponent } from './response/response.component';

export const customerRoutes: Routes = [
    
    {
        path: 'customer-profile', component: CustomerComponent,
        children: [{ path: '', component: CustomerProfileComponent }], canActivate: [AuthGuard]
    },
    {
        path: 'trip', component: CustomerComponent,
        children: [{ path: '', component: TripComponent }], canActivate: [AuthGuard]
    },
    {
        path: 'online-driver', component: CustomerComponent,
        children: [{ path: '', component: OnlineDriverComponent }], canActivate: [AuthGuard]
    },
    {
        path: 'response', component: CustomerComponent,
        children: [{ path: '', component: ResponseComponent }], canActivate: [AuthGuard]
    },
]