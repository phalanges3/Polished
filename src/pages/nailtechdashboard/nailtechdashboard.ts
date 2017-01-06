import { Component } from '@angular/core'
import { NavController, NavParams, ModalController } from 'ionic-angular'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { AvailabilityPage} from '../availability/availability'
import { ProfilePage} from '../profile/profile'
import { SelectservicePage } from '../selectservice/selectservice'
import * as moment from 'moment/moment'
import { Chart } from 'chart.js'
import { ReviewPage } from '../review/review'


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
  isVendor: any
  pastAppointments: any = []
  pastAppts: any  =  [{
    start: "loading",
    date: "loading",
    houseNumber: "",
    streetName: "",
    city: "",
    state: "",
    zipCode: ""
  }]
  monthlyAvgs: any = [5, 4.5, 4.55 , 4.7, 4.83, 4.86, 4.9, 4.7, 4.9, 4.9, 4.88, 4.89 ]
  earningAvgs: any = [500,180,200,90,230,70,190,190,190,400,240,168]
  type = 'line';
  dataChart = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      { label: "Monthly Average Rating",
        data: this.monthlyAvgs
      }]
  }
  options = {
  responsive: true,
  maintainAspectRatio: false
  };
  dataChart2 = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      { label: "Monthly Earnings",
        data: this.earningAvgs
      }]
  }

  appointments: any = [{
    start: "loading",
    date: "loading",
    houseNumber: "",
    streetName: "",
    city: "",
    state: "",
    zipCode: ""

  }]
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public modalCtrl: ModalController) {
     this.data = this.navParams.get("data")

     console.log('Data from login in TECH DASH: ', this.data)
    let convert =function (input) {
      return moment(input, 'HH:mm:ss').format('h:mm A');
    }
    let convertDate = function (input)  {
      return moment(input.slice(0,10), 'YYYY-MM-DD').toString()
    }

    
    this.isVendor = localStorage.getItem('isVendor')
    


    if(this.data.isVendor === 1){
      this.earningsFlag = true
      this.ratingsFlag  =  true
      this.updateHoursFlag = true
      this.http.post('http://localhost:3000/api/appointment/getappointment', ({"userId": this.data.id}))
        .subscribe(appointment => {
        //console.log("appointment  response", appointment.json())
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
        this.pastAppts = result
        for(let i = 0; i <this.appointments.length; i++){
          this.newDate = new Date(this.appointments[i].date)
          if(this.newDate.valueOf() < this.currentDate.valueOf()){
            let temp = this.appointments.splice(i,1)
            this.pastAppointments.push(temp)
            i--
          } 
        }

        for(let j = 0; j<this.appointments.length; j++){
          this.newDate = convertDate(this.appointments[j].date)
          this.appointments[j].start = convert(this.appointments[j].start)
          this.appointments[j].date = this.newDate.slice(3, 15)
        }
        console.log("pastAppts line 121", this.pastAppointments)
        for(let h = 0; h < this.pastAppointments.length; h++){
          console.log("inside for loop")
          console.log(this.pastAppointments[h][0].date.slice(5,7), "sliced month")
          let countJan = 0
          if(this.pastAppointments[h][0].date.slice(5,7) === "01"){
            countJan++
            if(this.pastAppointments[h][0].total){
              this.earningAvgs[0]+= this.pastAppointments[h][0].total.slice(1)
            } else  {
              this.earningAvgs[0]+= 18
            }
            
            console.log('new Jan total', this.earningAvgs[0])
          }
          // this.earningAvgs[0] = this.monthlyAvgs[0]/countJan
          // console.log('new Jan total divided by length', this.earningAvgs[0])
         }
      })
       console.log("after  past appt array")
       for(let h = 0; h < this.pastAppointments.length; h++){
          console.log("inside for loop")
          console.log(this.pastAppointments[h].createdAt.slice(5,7), "sliced month")
          let countJan = 0
          if(this.pastAppointments[h].date.slice(5,7) === "01"){
            countJan++
            this.earningAvgs[0]+= this.pastAppointments[h].price.slice(1)
            console.log('new Jan total', this.earningAvgs[0])
          }
          this.earningAvgs[0] = this.monthlyAvgs[0]/countJan
          console.log('new Jan total divided by length', this.earningAvgs[0])
         }
      
      
       // this.http.post('http://localhost:3000/api/review/getreviews', ({"userId": this.data.id}))
       //  .subscribe(reviews => {
       //  console.log("reviews  response", reviews.json())
       //  let result = reviews.json()
       // for(let k = 0; k < result.length; k++){
       //    console.log(result[k].createdAt.slice(5,7), "sliced month")
       //    let countJan = 0
       //    if(result[k].createdAt.slice(5,7) === "01"){
       //      countJan++
       //      this.monthlyAvgs[0]+= result[k].rating
       //      console.log('new Jan total', this.monthlyAvgs[0])
       //    }
       //    this.monthlyAvgs[0] = this.monthlyAvgs[0]/countJan
       //    console.log('new Jan total divided by length', this.monthlyAvgs[0])
       //   }
       //  })
      } else {
      this.bookFlag = true
      this.http.post('http://localhost:3000/api/appointment/clientappointments', ({"clientId": this.data.id}))
        .subscribe(appointment => {
        let result = appointment.json()
        //console.log('result of call user dash line 91', result)
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
        // This parses the future appointments into the appointments array and past appointments into past apps array.
        for(let i = 0; i <this.appointments.length; i++){
          this.newDate = new Date(this.appointments[i].date)
          if(this.newDate.valueOf() < this.currentDate.valueOf()){
            this.pastAppointments.push(this.appointments.splice(i,1))
            i--
          }
        }

        // Loops through the future appointments array
        for(let j = 0; j<this.appointments.length; j++){
          this.newDate = convertDate(this.appointments[j].date)
          this.appointments[j].start = convert(this.appointments[j].start)
          this.appointments[j].date = this.newDate.slice(3, 15)
        }


        // Loops through the pastAppointments array
        for(let k = 0; k<this.pastAppointments.length; k++){
          console.log('line 121 ', this.pastAppointments[k][0][0], this.pastAppointments[k][0][1])
          this.newDate = convertDate(this.pastAppointments[k][0].date)
          this.pastAppointments[k].start = convert(this.pastAppointments[k][0].start)
          this.pastAppointments[k].date = this.newDate.slice(3, 15)
        }
        console.log('last pastAppointments object ', this.pastAppointments)
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
    //console.log('ionViewDidLoad NailtechdashboardPage')
  }
  goToProfile() {
    this.navCtrl.push(ProfilePage, {
      data: this.data
    })
  }

  reviewModal(pastApp) {
    let modal = this.modalCtrl.create(ReviewPage, {data: pastApp}, {"showBackdrop": false, "enableBackdropDismiss": false});
    modal.present();

  }

}
