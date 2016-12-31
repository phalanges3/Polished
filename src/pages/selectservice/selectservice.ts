import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BestmatchPage } from '../bestmatch/bestmatch';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Selectservice page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-selectservice',
  templateUrl: 'selectservice.html'
})
export class SelectservicePage {
  result = {
    response: '',
    bookInfo: ''
  }
  bookInfo : FormGroup
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public http: Http) {
    this.bookInfo = formBuilder.group({
       service: '',
       addOns: '',
       date: '2016-01-01',
       time: '',
       houseNumber: '',
       unitNumber: '',
       street: '',
       city: '',
       state: '',
       zipCode: '',
       price: ''
    })
  }
  //get request
  navigate(){
    console.log(this.bookInfo)
    let cost  = {
      manicure: "$18",
      pedicure: "$25",
      manipedi: "$35"
    }
    let today = new Date(this.bookInfo.value.date)
    let weekday = new Array(7)
      weekday[0] =  "Sunday"
      weekday[1] = "Monday"
      weekday[2] = "Tuesday"
      weekday[3] = "Wednesday"
      weekday[4] = "Thursday"
      weekday[5] = "Friday"
      weekday[6] = "Saturday"
    let dayOfWeek: String = weekday[today.getDay() + 1]
    console.log(today)
    console.log(today.getDay())
    console.log(dayOfWeek)
    this.http.post('http://localhost:3000/api/appointment/findartists', ({"zipCode": this.bookInfo.value.zipCode, "day": dayOfWeek, "date": this.bookInfo.value.date +  "T00:00:00.000Z", "time":this.bookInfo.value.time}))
      .subscribe(artist => {
        console.log("in get", artist)
        this.bookInfo.value.price = cost[this.bookInfo.value.service]
        this.result.response =  artist.json()
        this.result.bookInfo = this.bookInfo.value
        console.log("result", this.result) 
        this.navCtrl.push(BestmatchPage, {
          data: this.result
        })
      })
   
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectservicePage');
  }

}
 // this.navCtrl.push(BestmatchPage, {
    //    firstPassed: "value 1",
    //    secondPassed: "value 2"
    // })