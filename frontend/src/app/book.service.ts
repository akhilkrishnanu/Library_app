import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }
  server_address: string = 'api';
  getbooks()
  {
    return this.http.get(`${this.server_address}/getbooks`);

  }

  getbook(id: any)
  {
    return this.http.get(`${this.server_address}/getbook/`+id);


  }

  addbook(book: any)
  {
    return this.http.post<any>(`${this.server_address}/addbook`,{"book":book});
  }

  updatebook(book: any,bookid: any)
  {
    return this.http.put(`${this.server_address}/updatebook`,{"book":book, "bookid":bookid});
   
  }

  deletebook(bookid: any)
  {
    return this.http.delete(`${this.server_address}/deletebook/`+bookid)
    .subscribe(data=>{
      console.log(data)
    })
  }
}
