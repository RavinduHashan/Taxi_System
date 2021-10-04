import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Onlinedriver } from '../../shared/onlinedriver.model';
import { OnlinedirverService } from '../../shared/onlinedirver.service';

declare var M: any;

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css'],
  providers: [OnlinedirverService]
})
export class OnlineComponent implements OnInit {

  constructor(public onlinedriverService: OnlinedirverService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshOnlinedriverList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.onlinedriverService.selectedOnlinedriver = {
      online_driver_id: "",
      o_d_id: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.online_driver_id == "") {
      this.onlinedriverService.postOnlinedriver(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshOnlinedriverList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.onlinedriverService.putOnlinedriver(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshOnlinedriverList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshOnlinedriverList() {
    this.onlinedriverService.getOnlinedriverList().subscribe((res:any) => {
      console.log(res)
      this.onlinedriverService.onlinedrivers = res.rows as Onlinedriver[];
      
    });
  }

  onEdit(ond: Onlinedriver) {
    this.onlinedriverService.selectedOnlinedriver = ond;
  }

  onDelete(online_driver_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.onlinedriverService.deleteOnlinedriver(online_driver_id).subscribe((res:any) => {
        this.refreshOnlinedriverList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
