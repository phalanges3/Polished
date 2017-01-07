import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { Addreview } from '../../providers/addreview';

/*
  Generated class for the Review page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-review',
  templateUrl: 'review.html'
})

export class ReviewPage {
  data: any;
  imageUrl: any = null;
  markers: any = {
    firstName: 'George',
    lastName: 'Cantstanya',
    insta: 'georgy-castans',
    pic: 'http://vignette1.wikia.nocookie.net/seinfeld/images/7/76/George-costanza.jpg/revision/latest?cb=20110406222711',
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private userReview: Addreview) {
    this.data = Object.assign(this.navParams.get("pastApp")[0], this.navParams.get("clientInfo"));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage, data ', this.data);
  }

   dismiss() {
    this.viewCtrl.dismiss();
  }

  submitReview(review) {
    //console.log('review submitted!', review)
    let content = Object.assign(this.data, review)
    this.userReview.addReview(content)
      .subscribe(
        (data: any) => {
          console.log('heres the data from review services', data)
          this.dismiss();
      });
  }

  takePhoto() {
    Camera.getPicture().then((imageData) => {
      this.imageUrl = imageData
      console.log('heres the image from photo shot ', imageData)
    }, (err) => {
      console.log('Error on review takePhoto function ', err)
    })
  }

   accessGallery(){
   Camera.getPicture({
     sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.imageUrl = 'data:image/jpeg;base64,'+imageData;
     }, (err) => {
      console.log(err);
    });
  }

}
