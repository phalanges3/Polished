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

  constructor(public http: Http, ) {
    console.log('Hello Calendar Provider');
   
  }
  // window.plugins.Calendar.hasReadWritePermission()
  //   .then( permission => {
  //    console.log(permission)
  // })
  // Calendar.createCalendar('MyCalendar')
  // .then(
  // 	(msg) => { console.log(msg)}
  // 	(err) => { console.log(err)}
  // )
  
}
