import { Component } from '@angular/core'
import { NavController, NavParams, ViewController} from 'ionic-angular'
import { ModalController } from 'ionic-angular'
import { ModalContentPage } from './modal'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    //get request here
  }
  showUpdateModal() {
    // let modal = this.modalCtrl.create(ModalContentPage);
    // modal.present();
    console.log('icon clicked')
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
