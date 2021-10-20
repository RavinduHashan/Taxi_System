import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { OrdersComponent } from './orders.component';
import { EditOrdersComponent } from './editOrders/editOrders.component';
import { NewComponent } from './new/new.component';



export const ordersRoutes: Routes = [

    {
        path: 'edit-order/:id', component: OrdersComponent,
        children: [{ path: '', component: EditOrdersComponent }], canActivate: [AuthGuard]
    },
    {
      path: 'new', component: OrdersComponent,
      children: [{ path: '', component: NewComponent }], canActivate: [AuthGuard]
  }
]

