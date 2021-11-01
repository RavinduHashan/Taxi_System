import { Pipe, PipeTransform } from '@angular/core';

import { Order } from './shared/order.model';
import { OrderService } from './shared/order.service';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(Orders:Order[], searchValue:string): Order[] {

    if(!Orders || !searchValue){
    return Orders;
    }
    return Orders.filter(order =>
      order.pick_location.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }
}
