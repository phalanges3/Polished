import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

/*
  Generated class for the Directions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-directions',
  templateUrl: 'directions.html'
})

export class DirectionsPage {
  url: any
  safe: any
  data: any
  appt: any
  originHouse: any
  originStreet: any
  originCity: any
  originState: any
  destHouse: any
  destStreet: any
  destCity: any
  destState: any

  constructor(public navCtrl: NavController, public navParams: NavParams,  private sanitizer: DomSanitizer) {
  	this.data = this.navParams.get("data")
  	this.appt = this.navParams.get("appointment")
  	console.log("inside directions 23 data: ", this.data,  "appoint: ", this.appt)
  	console.log(this.data.houseNumber, this.data.streetName,  this.data.city,  this.data.state)
  	this.originHouse = this.data.houseNumber
  	this.originStreet = this.data.streetName
  	// for (let i = 0; i < this.destinationStreet.length; i++){
  	// 	if(this.destinationStreet[i] === " "){
  	// 		this.destinationStreet =  this.destinationStreet.slice(0, i+1)
  	// 	}
  	// }
  	this.originCity = this.data.city
  	this.originState = this.data.state
  	this.destHouse = this.appt.houseNumber
  	this.destStreet = this.appt.streetName
  	this.destCity =  this.appt.city
  	this.destState =  this.appt.state
  }
  ionViewDidLoad() {
  	this.url = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyCUdH3UYv6hl69P9m1W33GUzp_t6h4oSJY&origin=" + this.originHouse  +  "+"  + this.originStreet + "," + "+" + this.originCity + "," + this.originState +  "&destination=" + this.destHouse  +  "+"  + this.destStreet + "," + "+" + this.destCity + "," + this.destState + "&zoom=12"
  	this.safe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    console.log('ionViewDidLoad DirectionsPage');
  }

}
