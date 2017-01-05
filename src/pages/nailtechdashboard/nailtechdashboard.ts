import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { AvailabilityPage} from '../availability/availability'
import { ProfilePage} from '../profile/profile'
import { SelectservicePage } from '../selectservice/selectservice'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-nailtechdashboard',
  templateUrl: 'nailtechdashboard.html'
})
export class NailtechdashboardPage {
  data: any
  newDate: any
  earningsFlag: any = false
  ratingsFlag: any = false
  updateHoursFlag: any =  false
  bookFlag: any = false

  appointments: any = {
   services_selected:  "loading",
   start: "",
   date: "",
   houseNumber: "",
   streetName: "",
   city: "",
   state: "",
   zipCode: ""
 }

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage) {
     this.data = this.navParams.get("data")
     console.log('Data from login: ', this.data)
    
    if(this.data.isVendor === 1){
      this.earningsFlag = true
      this.ratingsFlag  =  true
      this.updateHoursFlag = true
      this.http.post('http://localhost:3000/api/appointment/getappointment', ({"userId": this.data.id}))
        .subscribe(appointment => {
        let result = appointment.json()
        if(result.length === 0){
          this.appointments = "no appointments"
        }
        this.appointments = appointment.json()[0]
        this.newDate = new Date(this.appointments.date)
        this.appointments.date = this.newDate.toDateString()
        console.log(this.appointments)
      })
    } else {
      this.bookFlag = true
      this.http.post('http://localhost:3000/api/appointment/clientappointments', ({"clientId": this.data.id}))
        .subscribe(appointment => {
        if(appointment.json().length === 0){
          this.appointments = "no appointments"
        }
        this.appointments = appointment.json()[0]
        this.newDate = new Date(this.appointments.date)
        this.appointments.date = this.newDate.toDateString()
        console.log(this.appointments)
      })
    }
  }
  goToAvailability(){
    this.navCtrl.push(AvailabilityPage, {
       firstPassed: "value 1",
       secondPassed: "value 2"
    })
  }
  goToBook(){
    this.navCtrl.push(SelectservicePage, {
      data: this.data
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NailtechdashboardPage')
  }
  goToProfile() {
    this.navCtrl.push(ProfilePage, {
      data: this.data
    })
  }

}
