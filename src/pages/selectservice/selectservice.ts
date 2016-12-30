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
       date: '',
       time: '',
       houseNumber: '',
       unitNumber: '',
       street: '',
       city: '',
       state: '',
       zipCode: ''
    })
  }
  //get request
  navigate(){
    console.log(this.bookInfo)
    this.http.post('http://localhost:3000/api/appointment/findartists', ({"zipCode": this.bookInfo.value.zipCode, "date":this.bookInfo.value.date + "T00:00:00.000Z", "time":this.bookInfo.value.time}))
      .subscribe(artist => {
        console.log("in get", artist)
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