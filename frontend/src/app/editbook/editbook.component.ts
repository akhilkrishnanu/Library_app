import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {

  constructor(private route:ActivatedRoute, private bookservice:BookService, private router:Router) { }

  bookid: any;
  book={
    bookName: "",
    authorName: "",
    bookInfo:"",
    bookImg: "",
  }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params=>{
      this.bookid = params['bookid'];
    });

    this.bookservice.getbook(this.bookid)
    .subscribe(data=>{
      this.book= JSON.parse(JSON.stringify(data));
    })
  }

  editbook()
  {
    this.bookservice.updatebook(this.book,this.bookid)
    .subscribe(
      data=>{
      console.log(data);
      this.router.navigate(['/books'])
    },
    err=>{
      alert("Invalid login Session")
      this.router.navigate(["/login"])
    })
    
  }

  

}
