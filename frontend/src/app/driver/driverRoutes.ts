import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { DriverComponent } from './driver.component';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';
import { AvailableComponent } from './available/available.component';
import { TripOrderComponent } from './trip-order/trip-order.component';
import { HistoryComponent } from './history/history.component';
import { EditDriverProfileComponent } from './edit-driver-profile/edit-driver-profile.component';


export const driverRoutes: Routes = [

    {
        path: 'driver-profile', component: DriverComponent,
        children: [{ path: '', component: DriverProfileComponent }], canActivate: [AuthGuard]
    },
    {
        path: 'available', component: DriverComponent,
        children: [{ path: '', component: AvailableComponent }], canActivate: [AuthGuard]
    },
    {
        path: 'trip-order', component: DriverComponent,
        children: [{ path: '', component: TripOrderComponent }], canActivate: [AuthGuard]
    },
    {
        path: 'history', component: DriverComponent,
        children: [{ path: '', component: HistoryComponent }], canActivate: [AuthGuard]
    },
    {
      path: 'edit-driver-profile/:id', component: DriverComponent,
      children: [{ path: '', component: EditDriverProfileComponent }], canActivate: [AuthGuard]
    },

]
