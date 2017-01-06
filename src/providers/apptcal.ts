import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Calendar} from 'ionic-native';

/*
  Generated class for the Calendar provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Apptcal {

  constructor(public http: Http, public calendar: Calendar) {
    console.log('Hello Calendar Provider');
   
  }
  // calendar.hasReadWritePermission()
  //   .then( permission => {
  //    console.log(permission)
  // })
  // calendar.createCalendar('MyCalendar')
  // .then(
  // 	(msg) => { console.log(msg)}
  // 	(err) => { console.log(err)}
  // )
  
}
