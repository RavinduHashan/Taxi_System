import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { DriverComponent } from './driver.component';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';
import { OnlineComponent } from './online/online.component';
import { TripOrderComponent } from './trip-order/trip-order.component';
import { HistoryComponent } from './history/history.component';

export const driverRoutes: Routes = [
    
    {
        path: 'driver-profile', component: DriverComponent,
        children: [{ path: '', component: DriverProfileComponent }], canActivate: [AuthGuard]
    },
    {
        path: 'online', component: DriverComponent,
        children: [{ path: '', component: OnlineComponent }], canActivate: [AuthGuard]
    },
    {
        path: 'trip-order', component: DriverComponent,
        children: [{ path: '', component: TripOrderComponent }], canActivate: [AuthGuard]
    },
    {
        path: 'history', component: DriverComponent,
        children: [{ path: '', component: HistoryComponent }], canActivate: [AuthGuard]
    },
]