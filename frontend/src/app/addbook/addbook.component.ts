import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  constructor(private bookservice:BookService, private route:Router) { }

  ngOnInit(): void {
  }

  book={
    bookName: "",
    authorName: "",
    bookInfo:"",
    bookImg: "",
  }
  addBook(){
    console.log("🚀 ~ file: addbook.component.ts ~ line 35 ~ AddbookComponent ~ addBook ~ book", this.book)
    this.bookservice.addbook(this.book)
    .subscribe(
      data=>
      {
      console.log(data);
      this.route.navigate(["/books"]);
    },
    err=>{
      alert("Invalid login Session")
      this.route.navigate(["/login"])
    })
  }

}
