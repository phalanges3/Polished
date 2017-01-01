import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { Http } from '@angular/http'


/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignUpPage {
  signup

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  addSignup() {
    this.http
      .get('http://localhost:3000/api/user/signup')
      .map((res) => {
        res.json()
      })
      .subscribe((data) => {

      })



  }

}
