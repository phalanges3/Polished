import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AvailabilityPage} from '../availability/availability'

/*
  Generated class for the Nailtechdashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-nailtechdashboard',
  templateUrl: 'nailtechdashboard.html'
})
export class NailtechdashboardPage {
  appointments: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http.get('http://localhost:3000/api/appointment/getappointment').map(res => res.json()).subscribe(data => {  
        this.appointments  =  data.data.children
     })
  }
  goToAvailability(){
    this.navCtrl.push(AvailabilityPage, {
       firstPassed: "value 1",
       secondPassed: "value 2"
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NailtechdashboardPage')
  }

}
