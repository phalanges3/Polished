import { Component, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NavController, NavParams } from 'ionic-angular'
import { UsernameValidator } from  '../../validators/username'
import { Http } from '@angular/http'
 
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignUpPage {
  signup
 
signupForm: FormGroup
 
    submitAttempt: boolean = false;
 
    constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http) {
       this.signupForm = formBuilder.group({
        firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: [''],
        userName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername],
        isVendor: ['', Validators.required],
        password: ['']
      })
    }
 
    addSignup(){
      this.submitAttempt = true
      console.log("success!", this.signupForm.value)
      this.http
        .post('http://localhost:3000/api/user/signup', this.signupForm.value)
        .map((res) => {
          res.json()
        })
        .subscribe((data) => {

      })
    }
    
 // add clearing of formdata
}
