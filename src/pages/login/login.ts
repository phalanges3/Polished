import { Component, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NavController, NavParams, AlertController } from 'ionic-angular'
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import { NailtechdashboardPage} from '../nailtechdashboard/nailtechdashboard'
import { PaymentPage } from '../payment/payment'
import { LoadingController } from 'ionic-angular'
import { SignUpPage } from '../signup/signup'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loader: any
  loginForm: FormGroup;
  submitAttempt: boolean = false;
  constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public formBuilder: FormBuilder, 
        public http: Http,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController
        ) {
        this.loginForm = formBuilder.group({
          userName: [''],
          password: ['']
        })
      }

  addLogin() {
      this.submitAttempt = true;
      console.log("loginformvalue!", this.loginForm.value)
      console.log(this.http.post, "HTTP")
        // var headers = new Headers();
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // headers.append('Access-Control-Allow-Origin', '*')
      return this.http
        .post('http://http://ec2-54-201-208-89.us-west-2.compute.amazonaws.com:3000/api/user/login', this.loginForm.value)
        .map((res) => {
          let response = res.json()
          if ( response === null) {
            console.log("is null", response)
            let alert = this.alertCtrl.create({
            title: 'Please try again',
            buttons: ['Dismiss']
            })
          alert.present();
          }
          else  {
             console.log("is response", response)
            this.navCtrl.push(NailtechdashboardPage, {
                data: response
            })
          }
        })
        .subscribe((data) => {
          console.log("DATA: ", data)
          this.presentLoading()
        })
  }

 presentLoading() {
  this.loader = this.loadingCtrl.create({
      content: "Logging into your account..."
  })
  this.loader.present()
    setTimeout(() => {
      this.loader.dismiss()
    }, 1300)
}

ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
}

goToSignUp() {
    this.navCtrl.push(SignUpPage)
}
 
}