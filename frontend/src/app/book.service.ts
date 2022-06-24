import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  getbooks()
  {
   return this.http.get("http://localhost:3000/getbooks");

  }

  getbook(id: any)
  {
   return this.http.get("http://localhost:3000/getbook/"+id);

  }

  addbook(book: any)
  {
 return this.http.post("http://localhost:3000/addbook",{"book":book});
  }

  updatebook(book: any,bookid: any)
  {
   return this.http.put("http://localhost:3000/updatebook",{"book": book, "bookid": bookid});
   
  }

  deletebook(bookid: any)
  {
    return this.http.delete("http://localhost:3000/deletebook/"+bookid)
    .subscribe(data=>{
      console.log(data)
    })
  }
}
