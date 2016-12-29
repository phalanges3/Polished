import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BestmatchPage } from '../bestmatch/bestmatch';

/*
  Generated class for the Selectservice page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-selectservice',
  templateUrl: 'selectservice.html'
})
export class SelectservicePage {
  bookInfo =  {}
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  //get request
  navigate(){
    this.navCtrl.push(BestmatchPage, {
       firstPassed: "value 1",
       secondPassed: "value 2"
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectservicePage');
  }

}
