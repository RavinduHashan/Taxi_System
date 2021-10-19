import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { OrdersComponent } from './orders.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';



export const orderRoutes: Routes = [

    {
        path: 'edit-order', component: OrdersComponent,
        children: [{ path: '', component: EditComponent }], canActivate: [AuthGuard]
    },
    {
      path: 'new', component: OrdersComponent,
      children: [{ path: '', component: NewComponent }], canActivate: [AuthGuard]
  }
]

