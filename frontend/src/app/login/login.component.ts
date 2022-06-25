import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user={
    username:"",
    password:""
  }
  message:any
  id:any
  constructor(private userservice:UserService, private route:Router) { }

  ngOnInit(): void {
  }
  loginUser(){
    this.userservice.userLogin(this.user)
    .subscribe(
    res=>{
      this.id = JSON.parse(JSON.stringify(res.token));
      localStorage.setItem('userToken',this.id);
      this.route.navigate(["/books"])

    },
    err=>{
      console.log(err.message);
      this.message = err.error.message;
    }
    );
  }

}
