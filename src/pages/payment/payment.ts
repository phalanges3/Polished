import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
<<<<<<< HEAD
import { Braintree } from 'braintree'
=======
// import { Braintree } from 'braintree'
>>>>>>> feat/init


@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {

<<<<<<< HEAD
  constructor(public navCtrl: NavController, public navParams: NavParams, public braintree: Braintree) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
    this.braintree.setup('CLIENT-TOKEN-FROM-SERVER', 'dropin', {
      container: 'dropin-container'
    })
=======
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
    // this.braintree.setup('CLIENT-TOKEN-FROM-SERVER', 'dropin', {
    //   container: 'dropin-container'
    // })
>>>>>>> feat/init
  }

}
