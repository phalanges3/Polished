import { Component, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NavController, NavParams } from 'ionic-angular'
import { UsernameValidator } from  '../../validators/username'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { NailtechdashboardPage} from '../nailtechdashboard/nailtechdashboard'
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
      //this.submitAttempt = true;
      console.log("loginformvalue!", this.loginForm.value)
      console.log(this.http.post, "HTTP")
      this.http
        .post('http://localhost:3000/api/user/login', this.loginForm.value)
        .map((res) => {
          console.log('response: ', res.json())
          let response = res.json()
          if ( response === null) {
            alert('Login not found')
          }
          else  {
            if (response.isVendor === 1)
            localStorage.setItem('UserLoggedIn', 'true')
            localStorage.setItem('isVendor', 'true')
            console.log("isvendor",response.isVendor)
            this.navCtrl.push(NailtechdashboardPage, {
              data: response
            })
          }
          
          
       
        })

        .subscribe((data) => {
          

      })
       

    }
  logout() {
     localStorage.clear()
  }
 
}