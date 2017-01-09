import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
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

  setBooking(nailArtist, bookInfo) {
    console.log('this is nail artist inside book service, ', nailArtist);
    console.log('this is booking inside book service, ', bookInfo);
    let appointmentData = {
          "userId": nailArtist.id,
          "date": bookInfo.date,
          "start": bookInfo.time,
          "end": ((bookInfo.time.split(':')[0]) + ":45"),
          "houseNumber": Number(bookInfo.houseNumber),
          "streetName": bookInfo.street,
          "unitNumber": Number(bookInfo.unitNumber),
          "city": bookInfo.city,
          "state": bookInfo.state,
          "zipCode": Number(bookInfo.zipCode),
          "clientId":  4,
          "nail_artist_id": nailArtist.id,
          "nail_artist_first": nailArtist.firstName,
          "nail_artist_second": nailArtist.lastName,
          "nail_artist_username": nailArtist.userName,
          "nail_artist_image": nailArtist.profile_image_url,
          "services_selected": bookInfo.service
    }
    //console.log('heres app data ', appointmentData)

    let body = JSON.stringify(appointmentData);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json')

    return this.http.post('http://localhost:3000/api/appointment/addappointment', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
  }

}
