import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/admin.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  //userDetails;
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.adminService.getAdminProfile().subscribe(
      (res:any) => {
        //this.userDetails = res['user'];
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  onLogout(){
    this.adminService.deleteToken();
    this.router.navigate(['/login']);
  }

}
