import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Online} from '../../shared/online.model';
import { onlineService } from '../../shared/online.service';

declare var M: any;

@Component({
  selector: 'app-online-driver',
  templateUrl: './online-driver.component.html',
  styleUrls: ['./online-driver.component.css'],
  providers: [onlineService]
})
export class OnlineDriverComponent implements OnInit {
  constructor(public onlineDriverService: onlineService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshOnlineDriverList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.onlineDriverService.selectedOnlineDriver = {
      online_driver_id: "",
      o_d_id: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.online_driver_id == "") {
      this.onlineDriverService.postOnlineDriver(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshOnlineDriverList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.onlineDriverService.putOnlineDriver(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshOnlineDriverList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshOnlineDriverList() {
    this.onlineDriverService.getOnlineDriverList().subscribe((res:any) => {
      console.log(res)
      this.onlineDriverService.onlines = res.rows as Online[];
      
    });
  }

  onEdit(ond: Online) {
    this.onlineDriverService.selectedOnlineDriver = ond;
  }

  onDelete(online_driver_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.onlineDriverService.deleteOnlineDriver(online_driver_id).subscribe((res:any) => {
        this.refreshOnlineDriverList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}

