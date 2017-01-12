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
import { DirectionsPage } from  '../directions/directions'


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
  chartFlag: any = false
  rateChartFlag: any = false
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
  monthlyAvgs: any = [0,0,0,0,0,0,0,0,0,0,0,0]
  earningAvgs: any = [0,0,0,0,0,0,0,0,0,0,0,0]
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

    if(this.data.isVendor === 1){

      this.earningsFlag = true
      this.ratingsFlag  =  true
      this.updateHoursFlag = true
      this.http.post('http://ec2-54-201-208-89.us-west-2.compute.amazonaws.com:3000/api/appointment/getappointment', ({"userId": this.data.id}))
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
        console.log("appts  line 103",  this.appointments)
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
          console.log(this.pastAppointments[h][0].date.slice(5,7), "sliced month in for loop")
          if(this.pastAppointments[h][0].date.slice(5,7) === "01"){
            if(this.pastAppointments[h][0].total){
              if(this.pastAppointments[h][0].total[0]==="$"){
                this.earningAvgs[0]+= parseInt(this.pastAppointments[h][0].total.slice(1))
              } else {
                this.earningAvgs[0]+= parseInt(this.pastAppointments[h][0].total)
              }
              
            } 
            console.log('new Jan total', this.earningAvgs[0])
          }  else if(this.pastAppointments[h][0].date.slice(5,7) === "02"){
            if(this.pastAppointments[h][0].total){
               if(this.pastAppointments[h][0].total[0]==="$"){
                this.earningAvgs[1]+= parseInt(this.pastAppointments[h][0].total.slice(1))
              } else {
                this.earningAvgs[1]+= parseInt(this.pastAppointments[h][0].total)
              }
            } 
            console.log('new Feb total', this.earningAvgs[0])
          }
           if(this.pastAppointments[h][0].date.slice(5,7) === "03"){
            if(this.pastAppointments[h][0].total){
               if(this.pastAppointments[h][0].total[0]==="$"){
                this.earningAvgs[2]+= parseInt(this.pastAppointments[h][0].total.slice(1))
              } else {
                this.earningAvgs[2]+= parseInt(this.pastAppointments[h][0].total)
              }
            } 
          }
          if(this.pastAppointments[h][0].date.slice(5,7) === "04"){
            if(this.pastAppointments[h][0].total){
               if(this.pastAppointments[h][0].total[0]==="$"){
                this.earningAvgs[3]+= parseInt(this.pastAppointments[h][0].total.slice(1))
              } else {
                this.earningAvgs[3]+= parseInt(this.pastAppointments[h][0].total)
              }
            } 
          }
          if(this.pastAppointments[h][0].date.slice(5,7) === "05"){
            if(this.pastAppointments[h][0].total){
               if(this.pastAppointments[h][0].total[0]==="$"){
                this.earningAvgs[4]+= parseInt(this.pastAppointments[h][0].total.slice(1))
              } else {
                this.earningAvgs[4]+= parseInt(this.pastAppointments[h][0].total)
              }
            } 
          }
          if(this.pastAppointments[h][0].date.slice(5,7) === "06"){
            if(this.pastAppointments[h][0].total){
               if(this.pastAppointments[h][0].total[0]==="$"){
                this.earningAvgs[5]+= parseInt(this.pastAppointments[h][0].total.slice(1))
              } else {
                this.earningAvgs[5]+= parseInt(this.pastAppointments[h][0].total)
              }
            } 
          }
          if(this.pastAppointments[h][0].date.slice(5,7) === "07"){
            if(this.pastAppointments[h][0].total){
               if(this.pastAppointments[h][0].total[0]==="$"){
                this.earningAvgs[6]+= parseInt(this.pastAppointments[h][0].total.slice(1))
              } else {
                this.earningAvgs[6]+= parseInt(this.pastAppointments[h][0].total)
              }
            } 
          }
          if(this.pastAppointments[h][0].date.slice(5,7) === "08"){
            if(this.pastAppointments[h][0].total){
               if(this.pastAppointments[h][0].total[0]==="$"){
                this.earningAvgs[7]+= parseInt(this.pastAppointments[h][0].total.slice(1))
              } else {
                this.earningAvgs[7]+= parseInt(this.pastAppointments[h][0].total)
              }
            } 
          }
          if(this.pastAppointments[h][0].date.slice(5,7) === "09"){
            if(this.pastAppointments[h][0].total){
               if(this.pastAppointments[h][0].total[0]==="$"){
                this.earningAvgs[8]+= parseInt(this.pastAppointments[h][0].total.slice(1))
              } else {
                this.earningAvgs[8]+= parseInt(this.pastAppointments[h][0].total)
              }
            } 
          }
          if(this.pastAppointments[h][0].date.slice(5,7) === "10"){
            if(this.pastAppointments[h][0].total){
               if(this.pastAppointments[h][0].total[0]==="$"){
                this.earningAvgs[9]+= parseInt(this.pastAppointments[h][0].total.slice(1))
              } else {
                this.earningAvgs[9]+= parseInt(this.pastAppointments[h][0].total)
              }
            } 
          }
          if(this.pastAppointments[h][0].date.slice(5,7) === "11"){
            if(this.pastAppointments[h][0].total){
               if(this.pastAppointments[h][0].total[0]==="$"){
                this.earningAvgs[10]+= parseInt(this.pastAppointments[h][0].total.slice(1))
              } else {
                this.earningAvgs[10]+= parseInt(this.pastAppointments[h][0].total)
              }
            } 
          }
          if(this.pastAppointments[h][0].date.slice(5,7) === "12"){
            if(this.pastAppointments[h][0].total){
               if(this.pastAppointments[h][0].total[0]==="$"){
                this.earningAvgs[11]+= parseInt(this.pastAppointments[h][0].total.slice(1))
              } else {
                this.earningAvgs[11]+= parseInt(this.pastAppointments[h][0].total)
              }
            } 
          }
          
         }
         this.chartFlag = true
      })
       this.http.post('http://ec2-54-201-208-89.us-west-2.compute.amazonaws.com:3000/api/review/getreviews', ({"userId": this.data.id}))
        .subscribe(reviews => {
        console.log("reviews  response", reviews.json())
        let result = reviews.json()
        let countDec = 0
        let countNov = 0
        let countOct = 0
        let countSep = 0
        let countAug = 0
        let countJul = 0
        let countJun = 0
        let countMay = 0
        let countApr = 0
        let countMar = 0
        let countFeb = 0
        let countJan = 0
        for(let k = 0; k < result.length; k++){
          console.log(result[k].review_date.slice(4,7), "sliced month")
          if(result[k].review_date.slice(4,7) === "Dec"){
            countDec++
            this.monthlyAvgs[11]+= result[k].rating
            console.log('new Dec total', this.monthlyAvgs[11])
          }
         if(result[k].review_date.slice(4,7) === "Nov"){
            countNov++
            this.monthlyAvgs[10]+= result[k].rating
            console.log('new Nov total', this.monthlyAvgs[10])
          }
         if(result[k].review_date.slice(4,7) === "Oct"){
            countOct++
            this.monthlyAvgs[9]+= result[k].rating
            console.log('new Nov total', this.monthlyAvgs[9])
          }
         if(result[k].review_date.slice(4,7) === "Sep"){
            countSep++
            this.monthlyAvgs[8]+= result[k].rating
            console.log('new Nov total', this.monthlyAvgs[8])
          }
          if(result[k].review_date.slice(4,7) === "Aug"){
            countAug++
            this.monthlyAvgs[7]+= result[k].rating
            console.log('new Nov total', this.monthlyAvgs[7])
          }
          if(result[k].review_date.slice(4,7) === "Jul"){
            countJul++
            this.monthlyAvgs[6]+= result[k].rating
          }
          if(result[k].review_date.slice(4,7) === "Jun"){
            countJun++
            this.monthlyAvgs[5]+= result[k].rating
          }
          if(result[k].review_date.slice(4,7) === "May"){
            countMay++
            this.monthlyAvgs[4]+= result[k].rating
          }
          if(result[k].review_date.slice(4,7) === "Apr"){
            countApr++
            this.monthlyAvgs[3]+= result[k].rating
          }
          if(result[k].review_date.slice(4,7) === "Mar"){
            countMar++
            this.monthlyAvgs[2]+= result[k].rating
          }
          if(result[k].review_date.slice(4,7) === "Feb"){
            countFeb++
            this.monthlyAvgs[1]+= result[k].rating
          }
           if(result[k].review_date.slice(4,7) === "Jan"){
            countJan++
            this.monthlyAvgs[0]+= result[k].rating
          }
         }
         this.monthlyAvgs[11] = this.monthlyAvgs[11]/(countDec*10)
         this.monthlyAvgs[10] = this.monthlyAvgs[10]/(countNov*10)
         this.monthlyAvgs[9] = this.monthlyAvgs[9]/(countOct*10)
         this.monthlyAvgs[8] = this.monthlyAvgs[8]/(countSep*10)
         this.monthlyAvgs[7] = this.monthlyAvgs[7]/(countAug*10)
         this.monthlyAvgs[6] = this.monthlyAvgs[6]/(countJul*10)
         this.monthlyAvgs[5] = this.monthlyAvgs[5]/(countJun*10)
         this.monthlyAvgs[4] = this.monthlyAvgs[4]/(countMay*10)
         this.monthlyAvgs[3] = this.monthlyAvgs[3]/(countApr*10)
         this.monthlyAvgs[2] = this.monthlyAvgs[2]/(countMar*10)
         this.monthlyAvgs[1] = this.monthlyAvgs[1]/(countFeb*10)
         this.monthlyAvgs[0] = this.monthlyAvgs[0]/(countJan*10)
         console.log(this.monthlyAvgs[11], "dec avg")
         console.log(this.monthlyAvgs[10], "nov avg")
         this.rateChartFlag = true
        })
      } else {
      this.bookFlag = true
      this.http.post('http://ec2-54-201-208-89.us-west-2.compute.amazonaws.com:3000/api/appointment/clientappointments', ({"clientId": this.data.id}))
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
      data: this.data
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

  goToDirections(appt){
    console.log("inside go to directions line line 347", appt)
    this.navCtrl.push(DirectionsPage, {data: this.data, appointment: appt} )
  }

  reviewModal(pastApp) {
    let modal = this.modalCtrl.create(ReviewPage, {pastApp: pastApp, clientInfo: this.data}, {"showBackdrop": false, "enableBackdropDismiss": false});
    modal.present();

  }

}
