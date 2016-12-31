import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentTime
  newTime = "2016"

  constructor(public navCtrl: NavController) {
    this.currentTime = new Date().getFullYear()
  }
  buttonClicked() {
    this.newTime = this.getRandomInt(1000, 4000)
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
