import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BestmatchPage } from '../bestmatch/bestmatch';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Geolocation} from 'ionic-native';


@Component({
  selector: 'page-selectservice',
  templateUrl: 'selectservice.html'
})
export class SelectservicePage {

  addressFlag:any = false
  addressFlagCount= 0
  geolocationFlag:any = false
  data: any

  result = {
    response: '',
    bookInfo: ''
  }
  long = 0
  lati = 0
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
       price: '',
       lat: 0,
       lon: 0
    })
  }

  enterAddress(){
    this.addressFlagCount++
    if(this.addressFlagCount>0 && this.addressFlagCount%2!==0){
      this.addressFlag = true
    } else  {
      this.addressFlag = false
    }
    
  }
  geoLocate(){
    Geolocation.getCurrentPosition().then(pos => {
      console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude)
    })

    let watch = Geolocation.watchPosition().subscribe(pos => {
      console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude)
      this.long = pos.coords.longitude
      this.lati = pos.coords.latitude
      // let  headers = new  Headers()
      // headers.append('Content-Type', 'application/json')
      console.log("saved lon lat", this.long,  this.lati)
      this.geolocationFlag = true
      this.http.post('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.lati + ',' + this.long + '&key=AIzaSyCVnqyWXNW0HqDOt7HDNf-fOZIguJ96EXo', '')
      .subscribe(address => {
        console.log("in post ", address.json())
        let addressRes = address.json()
        console.log("address", addressRes.results)
        this.bookInfo.value.houseNumber = addressRes.results[0].address_components[0].long_name
        this.bookInfo.value.street =  addressRes.results[0].address_components[1].short_name
        this.bookInfo.value.city =  addressRes.results[0].address_components[3].long_name
        this.bookInfo.value.state = addressRes.results[0].address_components[5].short_name
        this.bookInfo.value.zipCode = addressRes.results[0].address_components[7].long_name
        console.log(this.bookInfo.value, 'bookingInfo')
        console.log("captured zip", this.bookInfo.value.zipCode)
      })
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
    let params = ({"zipCode": this.bookInfo.value.zipCode, "day": dayOfWeek, "date": this.bookInfo.value.date +  "T00:00:00.000Z", "time":this.bookInfo.value.time + ":00"})
    console.log("params", params)
    this.http.post('http://localhost:3000/api/appointment/findartists', params)
      .subscribe(artist => {
        console.log("in Selectservice POST", artist)
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
