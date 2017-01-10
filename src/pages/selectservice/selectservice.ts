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

  addressFlag: any = false
  addressFlagCount= 0
  geolocationFlag: any = false
  noAddress: any = false
  geolocationCount= 0
  data: any

  result = {
    response: '',
    bookInfo: {
       service: '',
       addOns: '',
       date: '2017-01-01',
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
    },
    userInfo: ''
  }
  geoResult= {
    houseNumber: "1",
    street: '',
    city: '',
    state: '',
    zipCode: "90010"
  }
  long = 0
  lati = 0
  bookInfo : FormGroup
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public http: Http) {
    this.data = this.navParams.get("data")
     console.log('Data from login: ', this.data)
     this.result.userInfo = this.data
     this.bookInfo = formBuilder.group({
       service: '',
       addOns: '',
       date: '2017-01-01',
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
    this.geolocationFlag = false;
    this.addressFlagCount++
    if(this.addressFlagCount>0 && this.addressFlagCount%2!==0){
      this.addressFlag = true
    } else  {
      this.addressFlag = false
    }
    
  }
  geoLocate(){
    this.noAddress = false;
    Geolocation.getCurrentPosition().then(pos => {
      console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude)
    })

    let watch = Geolocation.watchPosition().subscribe(pos => {
      this.geolocationCount++
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
        if(addressRes.results[0].address_components[0]===undefined){
          console.log("geolocation unavailable")
        }
        this.geoResult.houseNumber = addressRes.results[0].address_components[0].long_name
        this.geoResult.street =  addressRes.results[0].address_components[1].short_name
        this.geoResult.city =  addressRes.results[0].address_components[3].long_name
        this.geoResult.state = addressRes.results[0].address_components[5].short_name
        this.geoResult.zipCode = addressRes.results[0].address_components[7].long_name
        console.log(this.bookInfo.value, 'bookingInfo')
        console.log("captured zip", this.geoResult.zipCode)
      })
    })
  }

  getAddressLatLong(address) {
    console.log('heres the address ...   ', address.value)
    //console.log(address.value.houseNumber + address.value.street + address.value.city + address.value.state)
    return this.http.post('https://maps.googleapis.com/maps/api/geocode/json?address='+ address.value.houseNumber + address.value.street + ', ' + address.value.city + ',' + address.value.state + '&key=AIzaSyCVnqyWXNW0HqDOt7HDNf-fOZIguJ96EXo', '')
      
  }

  //get request
  navigate(){
    console.log(this.bookInfo)
    let cost  = {
      Manicure: "18",
      Pedicure: "25",
      "Mani-Pedi": "35",
      "scrub": "5",
      "nailart": "5",
      "reflexology": "10",
      "gel": "5",
      "acrylic": "10",
      "parrafin": "10"
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
    let params
    if(this.geolocationCount>0){
      params = ({"zipCode": this.geoResult.zipCode, "day": dayOfWeek, "date": this.bookInfo.value.date +  "T00:00:00.000Z", "time":this.bookInfo.value.time + ":00"})
      this.http.post('http://localhost:3000/api/appointment/findartists', params)
      .subscribe(artist => {
        if (!artist.json().length) {
            console.log('sorry error in page', artist.json())
            console.log('No nail artist around here, try a different area!')
          }
          else {
            console.log("in Selectservice POST", artist)
            this.bookInfo.value.price = cost[this.bookInfo.value.service]
            this.result.response =  artist.json()
            this.result.bookInfo = this.bookInfo.value
            this.result.bookInfo.houseNumber = this.geoResult.houseNumber
            this.result.bookInfo.street = this.geoResult.street
            this.result.bookInfo.city = this.geoResult.city
            this.result.bookInfo.zipCode = this.geoResult.zipCode
            this.result.bookInfo.lat = this.lati
            this.result.bookInfo.lon = this.long
            console.log("this is the result from http call to select service ", this.result) 
            this.navCtrl.push(BestmatchPage, {
              data: this.result
            })
          }
      })
    } else {
      this.getAddressLatLong(this.bookInfo)
        .subscribe( result => {
        console.log('SUBSCRIBE RESULT !!!!! ', result.json())
        // console.log(result.json().results)
        console.log('error here!!!! ', result.json().results.length)
        if (!result.json().results.length) {
          this.noAddress = true 
          console.log('Address not found, please enter a new address.')
        }
        else {
          let addressLatLong = result.json().results[0].geometry.location;
          params = ({"zipCode": this.bookInfo.value.zipCode, "day": dayOfWeek, "date": this.bookInfo.value.date +  "T00:00:00.000Z", "time":this.bookInfo.value.time + ":00"})
          this.http.post('http://localhost:3000/api/appointment/findartists', params)
            .subscribe(artist => {
              if (!artist.json().length) {
                console.log('sorry error in page', artist.json())
                console.log('No nail artist around here, try a different area!')
              }
              else {
                console.log("in Selectservice POST", artist.json())
                this.bookInfo.value.price = cost[this.bookInfo.value.service]
                this.result.response =  artist.json()
                this.result.bookInfo = this.bookInfo.value
                this.result.bookInfo.lat = addressLatLong.lat
                this.result.bookInfo.lon = addressLatLong.lng
                console.log("this is the result from http call to select service ", this.result) 
                this.navCtrl.push(BestmatchPage, {
                  data: this.result
                })
              }
            })
          }
        })
      }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectservicePage');
  }

}
