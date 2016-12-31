import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Bookartist provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Bookartist {

  constructor(public http: Http) {
    
  }

  setBooking(data) {
    console.log('booking service hitting the providers page! ', data)
    this.http.get('http://localhost:3000/api/user/login')
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      })
  }

}
