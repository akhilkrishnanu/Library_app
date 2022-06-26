import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user={
    username:"",
    password: ""
  }
  Users:any;
  error:any;
  flag:any

  constructor(private userservice:UserService, private route:Router) { }

  ngOnInit(): void {
    this.userservice.getusers()
    .subscribe(data=>{
    console.log("🚀 ~ file: signup.component.ts ~ line 24 ~ SignupComponent ~ ngOnInit ~ data", data)
      this.Users = JSON.parse(JSON.stringify(data));
    })
  }

  addUser(){
    if(this.Users.length>=0){
      for(var i=0;i<this.Users.length;i++)
      {
        if(this.Users[i].username===this.user.username)
        {
          this.flag=true;
          break;
        }
        else
          this.flag=false;
        
      }
      if(this.flag==true) 
      {
        this.error = "username already exist";
      }
      else
      {
        this.userservice.userSignup(this.user);
        console.log("signup called");
        this.route.navigate(['/']);
        
      }

    }
    

  }

}
