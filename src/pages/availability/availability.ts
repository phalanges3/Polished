import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-availability',
  templateUrl: 'availability.html'
})
export class AvailabilityPage {
  data: any
  hours: FormGroup

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder, 
    public http: Http
    ) {
      this.data = this.navParams.get("data")
      this.hours = formBuilder.group({
      // startSun: '',
      // endSun: '',
      // startMon: '',
      // endMon: '',
      // startTue: '',
      // endTue: '',
      // startWed: '',
      // endWed: '',
      // startThu: '',
      // endThu: '',
      // startFri: '',
      // endFri: '',
      // startSat: '',
      // endSat: '',
      start: '',
      end: '',
      day: '',
      // mon: false,
      // tue: false,
      // wed: false,
      // thu: false,
      // fri: false,
      // sat: false,
      // sun: false
    })
    
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
    for(var  i = 0; i < this.hours.value.day.length; i++){
       this.http.put('https://ec2-54-201-208-89.us-west-2.compute.amazonaws.com:1443/api/schedule/updatehours', ({"userId": this.data.id, "day": this.hours.value.day[i], "start": this.hours.value.start, "end": this.hours.value.end}), this.headers)
       .subscribe(data => {
          console.log('DATA in availability PUT: ', data)
       })
    }
   
  }
}
