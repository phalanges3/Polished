import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfilePicsRevs {

  constructor(public http: Http) {
    console.log('Hello ProfilePicsRevs Provider');
  }

  fetchPicsRevs (artist) {
    //console.log('HERES THE ARTIST DATA ', artist)
    let body = JSON.stringify({userId: artist.id});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')


    return this.http.post('https://ec2-54-201-208-89.us-west-2.compute.amazonaws.com:1443/api/review/getreviews', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
  }

}
