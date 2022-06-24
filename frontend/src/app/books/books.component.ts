import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private bookservice:BookService, private route:Router) { }

  ngOnInit(): void {
    this.loadBooks();
  }
  books:any
  count:any

  loadBooks()
  {
    this.bookservice.getbooks()
    .subscribe(
      data=>{
      this.books= JSON.parse(JSON.stringify(data));
      this.count=this.books.length;
    },
    err=>{
      alert("Invalid login Session")
      this.route.navigate(["/login"])
    })
  }
  editBook(bookid:any)
  {
    this.route.navigate(["/edit-book"],{queryParams:{"bookid": bookid}})
  }
    
  deleteBook(bookid: any)
  {
  this.bookservice.deletebook(bookid);
  this.route.navigate(['/books']);
  this.loadBooks();
  // this.viewport.scrollToPosition([0,0]);
  }
}
