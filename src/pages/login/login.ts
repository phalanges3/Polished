import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginInput
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {}

  ionViewDidLoad() {
    this.loginInput = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    console.log('ionViewDidLoad LoginPage');
  }

  addLogin() {
    console.log('login fired', this.loginInput.value)
    
  }

}
