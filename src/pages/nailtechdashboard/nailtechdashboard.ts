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
  newDate: any
  appointments = {
   services_selected:  "loading",
   start: "",
   date: "",
   houseNumber: "",
   streetName: "",
   city: "",
   state: "",
   zipCode: ""
 }

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http.post('http://localhost:3000/api/appointment/getappointment', ({"userId": 1}))
    .subscribe(appointment => {
        console.log("in get", appointment.json()[0])
        this.appointments = appointment.json()[0]
        this.newDate = new Date(this.appointments.date)
        this.appointments.date = this.newDate.toDateString()
        console.log(this.appointments)
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
