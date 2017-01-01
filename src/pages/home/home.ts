import { Component, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NavController } from 'ionic-angular'
import { UsernameValidator } from  '../../validators/username'
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
signupForm: FormGroup;
 
    submitAttempt: boolean = false;
 
    constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {
       this.signupForm = formBuilder.group({
        firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: [''],
        username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername],
        privacy: ['', Validators.required],
        bio: ['']
      })
    }
 
    save(){
      this.submitAttempt = true;
      console.log("success!")
      console.log(this.signupForm.value);
    }
 
}