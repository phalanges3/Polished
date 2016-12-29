import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Availability page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-availability',
  templateUrl: 'availability.html'
})
export class AvailabilityPage {
  hours: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public http: Http) {
    this.hours = formBuilder.group({
      startSun: '',
      endSun: '',
      startMon: '',
      endMon: '',
      startTue: '',
      endTue: '',
      startWed: '',
      endWed: '',
      startThu: '',
      endThu: '',
      startFri: '',
      endFri: '',
      startSat: '',
      endSat: '',
      start: '',
      end: '',
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false
    });
    
  }

  public headers = new Headers({ 'Content-Type': 'application/json' })
  public options = new RequestOptions({ headers: this.headers })
  
  logForm(){
    console.log(this.hours)
    for(var key in this.hours.value){
    	if(this.hours.value[key] && this.hours.value[key]!== ""){
    		console.log(this.hours.value[key])
    	}
    }
   
    this.http.post('http://localhost:3000/api/schedule/', ({"userID": 1, "day": "Sun", "start": this.hours.value.startSun, "end": this.hours.value.startSun}), this.headers)
    .subscribe(data => {
       console.log(data)
    })
  }
}
