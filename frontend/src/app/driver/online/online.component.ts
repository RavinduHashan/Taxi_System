import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Online } from '../../shared/online.model';
import { onlineService } from '../../shared/online.service';

declare var M: any;

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css'],
  providers: [onlineService]
})
export class OnlineComponent implements OnInit {

  constructor(public OnlineService: onlineService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshOnlineList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.OnlineService.selectedOnlineDriver = {
      online_driver_id: "",
      o_d_id: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.online_driver_id == "") {
      this.OnlineService.postOnlineDriver(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshOnlineList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.OnlineService.putOnlineDriver(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshOnlineList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshOnlineList() {
    this.OnlineService.getOnlineDriverList().subscribe((res:any) => {
      console.log(res)
      this.OnlineService.onlines = res.rows as Online[];
      
    });
  }

  onEdit(ond: Online) {
    this.OnlineService.selectedOnlineDriver = ond;
  }

  onDelete(online_driver_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.OnlineService.deleteOnlineDriver(online_driver_id).subscribe((res:any) => {
        this.refreshOnlineList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
