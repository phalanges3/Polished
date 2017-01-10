import { Component, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NavController, NavParams, AlertController } from 'ionic-angular'
import { UsernameValidator } from  '../../validators/username'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login'
 
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignUpPage {
  signup
  nailCertFlag: false
 
signupForm: FormGroup
 
    submitAttempt: boolean = false;
 
    constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public formBuilder: FormBuilder, 
      public http: Http, 
      public alertCtrl: AlertController
      ) {
       this.signupForm = formBuilder.group({
        firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: [''],
        userName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername],
        isVendor: ['true', Validators.required],
        password: [''],
        nailCertification: []
      })
    }
 
    addSignup(){
      this.submitAttempt = true
      

      if (this.signupForm.value.isVendor === 'true') {
          this.signupForm.value.isVendor = 1
      }
        else {
          this.signupForm.value.isVendor = 0
        }
      console.log("success!", this.signupForm.value.isVendor)
      this.http
        .post('http://localhost:3000/api/user/signup', this.signupForm.value)
        .map((res) => {
          let response = res.json()
          console.log('response', response)

          if (response.nailCertification == this.signupForm.value.nailCertification) {
             let alertTrue = this.alertCtrl.create({
            title: 'Thank you for verifying your license',
            buttons: ['Dismiss']
            })
          alertTrue.present();
          }
          else {
             let alertFalse = this.alertCtrl.create({
            title: 'I\'m sorry, we were unable to verify your license',
            buttons: ['Dismiss']
            })
          alertFalse.present();
          }
        })
        .subscribe((data) => {
          this.navCtrl.push(LoginPage)

      })
    }
    
 // add clearing of formdata
}
