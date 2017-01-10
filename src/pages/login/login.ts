import { Component, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NavController, NavParams, AlertController } from 'ionic-angular'
import { UsernameValidator } from  '../../validators/username'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { NailtechdashboardPage} from '../nailtechdashboard/nailtechdashboard'
import { PaymentPage } from '../payment/payment'
import { LoadingController } from 'ionic-angular'
// import { LocalNotifications } from 'ionic-native';
import { SignUpPage } from '../signup/signup'


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private loginURL = 'http://localhost:3000/api/user/login'
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
      return this.http
        .post('http://localhost:3000/api/user/login', this.loginForm.value)
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
            localStorage.setItem('UserLoggedIn', 'true')
            localStorage.setItem('userName', response.userName)
            localStorage.setItem('isVendor', response.isVendor)
            localStorage.setItem('profile_image_url', response.profile_image_url)
            localStorage.setItem('firstName', response.firstName)
            localStorage.setItem('lastName', response.lastName)
            localStorage.setItem('email', response.email)
            localStorage.setItem('general_rating', response.general_rating)
            localStorage.setItem('zipCode', response.zipCode)
            localStorage.setItem('userId', response.id)
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

  logout() {
     localStorage.clear()
  }

  presentLoading() {
 
    this.loader = this.loadingCtrl.create({
      content: "Logging into your account..."
      
    });
    this.loader.present();
    setTimeout(() => {
    this.loader.dismiss()
    }, 1300)

  }

ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
      //leave push  notifications to test after deployment
      // LocalNotifications.schedule([{
      //    id: 1,
      //    text: 'Reminder Manicure @ 3:00 P.M.',
      //    sound: null
      //   },{
      //    id: 2,
      //    title: 'Appointment Reminder,
      //    text: 'Pedicure @ 4:00 P.M',
      //    icon: 'http://iconpopanswers.com/wp-content/uploads/2013/03/iconpopbrand-large-096.jpg'
      // }]);
      // LocalNotifications.schedule({
      //    text: 'Delayed ILocalNotification',
      //    at: new Date(new Date().getTime() + 3600),
      //    led: 'FF0000',
      //    sound: null
      // });
  }

  goToSignUp() {
    this.navCtrl.push(SignUpPage)
  }
 

}