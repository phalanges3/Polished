import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProfilePicsRevs provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfilePicsRevs {

  constructor(public http: Http) {
    console.log('Hello ProfilePicsRevs Provider');
  }

  fetchPicsRevs (artist) {
    console.log('HERES THE ARTIST DATA ', artist)
    let body = JSON.stringify({userId: artist.id});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')

    return this.http.post('http://localhost:3000/api/review/getreviews', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
  }

}
