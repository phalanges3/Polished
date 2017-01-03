import { Component, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NavController, NavParams } from 'ionic-angular'
import { UsernameValidator } from  '../../validators/username'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { HomePage} from '../home/home'
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private loginURL = 'http://localhost:3000/api/user/login'
  url = `${this.loginURL}/?=${{'userName':'jcpace'}}`;
 
loginForm: FormGroup;
 
    submitAttempt: boolean = false;
 
    constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http) {
       this.loginForm = formBuilder.group({
        userName: [''],
        password: ['']
      })
      
    }

    addLogin() {
      this.submitAttempt = true;
      console.log("success!", this.loginForm.value)
      
      this.http
        .post('http://localhost:3000/api/user/login', this.loginForm.value)
        .map((res) => {
          console.log('response: ', res)
          res.json()
       
        })
        .map((res) => {
          console.log('SECOND RES: ', res)
           localStorage.setItem('UserLoggedIn', 'true')
          localStorage.setItem('isVendor', 'true')
          this.navCtrl.push(HomePage)
        })

        .subscribe((data) => {
          console.log('DATA from get: ', data)
          

      })
    }
  logout() {
     localStorage.clear()
  }
 
}