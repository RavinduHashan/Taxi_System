import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { CustomerComponent } from './customer.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { AvailableDriverComponent } from './available-driver/available-driver.component';
import { ResponseComponent } from './response/response.component';
import { CreateOrderComponent } from './create-order/create-order.component';

export const customerRoutes: Routes = [
    
    {
        path: 'create-order', component: CustomerComponent,
        children: [{ path: '', component: CreateOrderComponent }], canActivate: [AuthGuard]
    },
    {
        path: 'customer-profile', component: CustomerComponent,
        children: [{ path: '', component: CustomerProfileComponent }], canActivate: [AuthGuard]
    },
    {
        path: 'available-driver', component: CustomerComponent,
        children: [{ path: '', component: AvailableDriverComponent }], canActivate: [AuthGuard]
    },
    {
        path: 'response', component: CustomerComponent,
        children: [{ path: '', component: ResponseComponent }], canActivate: [AuthGuard]
    },
]