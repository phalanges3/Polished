import { Component, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NavController, NavParams } from 'ionic-angular'
import { UsernameValidator } from  '../../validators/username'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { NailtechdashboardPage} from '../nailtechdashboard/nailtechdashboard'
import { Storage } from '@ionic/storage'
import { AlertController } from 'ionic-angular'
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private loginURL = 'http://localhost:3000/api/user/login'
  url = `${this.loginURL}/?=${{'userName':'jcpace'}}`;
 
loginForm: FormGroup;
 
    submitAttempt: boolean = false;
 
    constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public formBuilder: FormBuilder, 
      public http: Http,
      public storage: Storage,
      public alertCtrl: AlertController
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
            console.log("is null")
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
            console.log('Storage: ', this.storage)
            console.log("isvendor",response.isVendor)
            
            this.navCtrl.push(NailtechdashboardPage, {
              data: response
            })
          }
        })
        .subscribe((data) => {
          console.log("DATA: ", data)
         
        })
       }
  logout() {
     this.storage.clear()
     localStorage.clear()
  }
 
}