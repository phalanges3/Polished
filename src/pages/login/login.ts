import { Component, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NavController, NavParams } from 'ionic-angular'
import { UsernameValidator } from  '../../validators/username'
import { Http } from '@angular/http'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  signup
 
loginForm: FormGroup;
 
    submitAttempt: boolean = false;
 
    constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http) {
       this.loginForm = formBuilder.group({
        username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername],
        password: ['']
      })
    }
 
  // still incomplete GET request: 
    addLogin() {
      this.submitAttempt = true;
      console.log("success!", this.loginForm.value)
      this.http
        .get('http://localhost:3000/api/user/login')
        .map((res) => {
          res.json()
        })
        .subscribe((data) => {
          console.log('DATA from get: ', data)

      })
  }
 
}