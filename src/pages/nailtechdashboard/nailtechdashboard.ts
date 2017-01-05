import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { AvailabilityPage} from '../availability/availability'
import { ProfilePage} from '../profile/profile'
import { SelectservicePage } from '../selectservice/selectservice'
import * as moment from 'moment/moment'

@Component({
  selector: 'page-nailtechdashboard',
  templateUrl: 'nailtechdashboard.html'
})
export class NailtechdashboardPage {
  data: any
  newDate: any
  currentDate = new Date()
  earningsFlag: any = false
  ratingsFlag: any = false
  updateHoursFlag: any =  false
  bookFlag: any = false

  appointments: any = [{
    start: "loading",
    date: "loading",
    houseNumber: "",
    streetName: "",
    city: "",
    state: "",
    zipCode: ""

  }]


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
     this.data = this.navParams.get("data")
     console.log('Data from login: ', this.data)
    let convert =function (input) {
      return moment(input, 'HH:mm:ss').format('h:mm A');
    }
    let convertDate = function (input)  {
      return moment(input.slice(0,10), 'YYYY-MM-DD').toString()
    }
    if(this.data.isVendor === 1){
      this.earningsFlag = true
      this.ratingsFlag  =  true
      this.updateHoursFlag = true
      this.http.post('http://localhost:3000/api/appointment/getappointment', ({"userId": this.data.id}))
        .subscribe(appointment => {
        let result = appointment.json()
        if(result.length === 0){
          this.appointments = [{
            start: "loading",
            date: "loading",
            houseNumber: "",
            streetName: "",
            city: "",
            state: "",
            zipCode: ""

          }]
        }
        this.appointments = result
        for(let i = 0; i <this.appointments.length; i++){
          this.newDate = new Date(this.appointments[i].date)
          if(this.newDate.valueOf() < this.currentDate.valueOf()){
            this.appointments.splice(i,1)
            i--
          }
        }
        for(let j = 0; j<this.appointments.length; j++){
          this.newDate = convertDate(this.appointments[j].date)
          this.appointments[j].start = convert(this.appointments[j].start)
          this.appointments[j].date = this.newDate.slice(3, 15)
        }
        console.log(this.appointments)
      })
    } else {
      this.bookFlag = true
      this.http.post('http://localhost:3000/api/appointment/clientappointments', ({"clientId": this.data.id}))
        .subscribe(appointment => {
        if(appointment.json().length === 0){
          this.appointments = [{
            start: "loading",
            date: "loading",
            houseNumber: "",
            streetName: "",
            city: "",
            state: "",
            zipCode: ""

          }]
        }
        this.appointments = appointment.json()
        console.log("this.appointments",  this.appointments)
        for(let i = 0; i <this.appointments.length; i++){
          this.newDate = new Date(this.appointments[i].date)
          // if(this.newDate.valueOf() < this.currentDate.valueOf()){
          //   this.appointments.splice(i,1)
          //   i--
          // }
          this.appointments[i].start = convert(this.appointments[i].start)
          this.appointments[i].date = this.newDate.toDateString().slice(3)
        }
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
