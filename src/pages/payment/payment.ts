import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { Braintree } from 'braintree'


@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public braintree: Braintree) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
    this.braintree.setup('CLIENT-TOKEN-FROM-SERVER', 'dropin', {
      container: 'dropin-container'
    })
  }

}
