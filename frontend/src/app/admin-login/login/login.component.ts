import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";


import { AdminService} from '../../service/admin.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private adminService: AdminService,private router : Router) { }

  model ={
    username :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit() {
    if(this.adminService.isLoggedIn())
    this.router.navigateByUrl('/dashboard');
  }

  onSubmit(form : NgForm){
    this.adminService.login(form.value).subscribe(
      (res:any) => {
        this.adminService.setToken(res['token']);
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

}
