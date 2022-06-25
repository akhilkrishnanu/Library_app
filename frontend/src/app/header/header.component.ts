import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userservice: UserService, private route:Router) { }

  ngOnInit(): void {

  }
  logout()
  {
    localStorage.removeItem("userToken");
    this.route.navigate(["/"])
  }

}
