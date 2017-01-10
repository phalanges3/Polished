import { Component, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NavController } from 'ionic-angular'
import { UsernameValidator } from  '../../validators/username'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
 
    submitAttempt: boolean = false;
 
    constructor(
      public navCtrl: NavController, 
      public formBuilder: FormBuilder,
      public http: Http,
    ) {
       
    }
}