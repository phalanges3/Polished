import { Component } from '@angular/core'
import { NavController, NavParams, ViewController} from 'ionic-angular'
// import { ModalController } from 'ionic-angular'
// import { ModalContentPage } from './modal'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Http } from '@angular/http'
import { AlertController } from 'ionic-angular'
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {
  data: any
  licenseFlag = false
  updateFlag1 = false
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public http: Http
    ) {
      this.data = this.navParams.get("data")
      if(this.data.isVendor===1){
        this.licenseFlag = true
      }
    }
 showPrompt(){
   let prompt = this.alertCtrl.create({
        title: 'Update Account Information',
        // message: "Enter a name for this new album you're so keen on adding",
        inputs: [
          {
            name: 'firstName',
            placeholder: 'First Name'
          },
          {
            name: 'lastName',
            placeholder: 'Last Name'
          },
          {
            name: 'email',
            placeholder: 'Email'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              console.log('Saved clicked', data);
              this.updateFlag1 = true;
              this.http.put('http://localhost:3000/api/user/update', ({"userName": this.data.userName, "firstName": data.firstName, "lastName": data.lastName, "email": data.email}))
              .subscribe(result => {
                console.log('result', result)
                this.data.firstName = data.firstName
                this.data.lastName  = data.lastName
                this.data.email = data.email
              })
            }
          }
        ]
      });
      prompt.present();
    }
  showPrompt2(){
   let prompt2 = this.alertCtrl.create({
        title: 'Update Account Information',
        // message: "Enter a name for this new album you're so keen on adding",
        inputs: [
          {
            name: 'houseNumber',
            placeholder: 'House Number'
          },
          {
            name: 'street',
            placeholder: 'Street'
          },
          {
            name: 'city',
            placeholder: 'City'
          },
          {
            name: 'state',
            placeholder: 'State'
          },
          {
            name: 'zipCode',
            placeholder: 'Zip Code'
          }

        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              console.log('Saved clicked', data);
              this.updateFlag1 = true;
              this.http.put('http://localhost:3000/api/user/update', ({"userName": this.data.userName, "houseNumber": data.houseNumber, "streetName": data.street, "city": data.city, "state": data.state, "zipCode": data.zipCode}))
              .subscribe(result => {
                console.log('result', result)
                this.data.houseNumber = data.houseNumber
                this.data.streetName  = data.street
                this.data.city = data.city
                this.data.state =  data.state
                this.data.zipCode = data.zipCode
              })
            }
          }
        ]
      });
      prompt2.present();
    }

    showPrompt3(){
      let prompt3 = this.alertCtrl.create({
        title: 'Update Account Information',
        // message: "Enter a name for this new album you're so keen on adding",
        inputs: [
          {
            name: 'license',
            placeholder: 'License'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              console.log('Saved clicked', data);
              this.updateFlag1 = true;
              this.http.put('http://localhost:3000/api/user/update', ({"userName": this.data.userName, "nailCertification": data.license}))
              .subscribe(result => {
                console.log('result', result)
                this.data.nailCertification = data.license
              })
            }
          }
        ]
      });
      prompt3.present();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage')
    //get request here
  }
  // showUpdateModal() {
  //   let modal = this.modalCtrl.create(ModalContentPage)
  //   modal.present()
  //   console.log('icon clicked')
  // }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
