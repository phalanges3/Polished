import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { Addreview } from '../../providers/addreview';
import { Platform } from 'ionic-angular';
import {ViewChild, ViewChildren, QueryList, ElementRef} from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'page-review',
  templateUrl: 'review.html'
})

export class ReviewPage {

  @ViewChild('myname') 
  input: any; 
  @ViewChild('video') 
  video: any;
  width: any = 320;
  height: any = 240;
  canvas: any;
  photo: any = null;
  
  data: any;
  imageUrl: any = null;
  vidFlag: any = false;
  cloudinaryUrl: any;
  buttonFlag: any = false;
  readyMark: any = false;
  nativeElement: any;
  usedTakePicButton: any = false;
  tookPhoto: any = false;
  gallery: any = false;
  // markers: any = {
  //   firstName: 'George',
  //   lastName: 'Cantstanya',
  //   insta: 'georgy-castans',
  //   pic: 'http://vignette1.wikia.nocookie.net/seinfeld/images/7/76/George-costanza.jpg/revision/latest?cb=20110406222711',
  // }


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private userReview: Addreview, public platform: Platform,  public http: Http, private elementRef: ElementRef) {
    this.data = Object.assign(this.navParams.get("pastApp")[0], this.navParams.get("clientInfo"));
    this.platform = platform;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage, data ', this.data);
  }


    ngAfterViewInit() {


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

  takepicture() {
    this.canvas = document.getElementById('canvas')
    console.log('canvas ', this.canvas)
    let context = this.canvas.getContext('2d');
    if (this.width && this.height) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      context.drawImage(this.video, 0, 0, this.width, this.height);
      this.vidFlag = false;
      this.imageUrl = this.canvas.toDataURL('image/png');
      console.log('heres the image from take pic function ', this.imageUrl)
      this.usedTakePicButton = false;
      this.tookPhoto = true;
    }
  }

  clearImage() {
    // let context = this.canvas.getContext('2d');
    // context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.imageUrl = null
    this.vidFlag = true
    this.usedTakePicButton = true;
    this.tookPhoto = false;
    // this.imageUrl = this.canvas.toDataURL('image/png');
    this.video = document.getElementById('video');
    // this.takePhoto();
    // console.log('finished clear ', this.video)
    // console.log('finished clear ', this.video.elementRef)
    // console.log('finished clear ', this.video)
    setTimeout(() => {
      this.takePhoto();
    }, 1)
    
  }

  takePhoto() {
    // console.log('taking photo')
    // console.log(this.platform.platforms());
    // console.log('heres the check photo ', this.platform.is("core"))
    if (this.platform.is("core")) {
      this.vidFlag = true;
      this.buttonFlag = true;
      this.usedTakePicButton = true;
      console.log('opening laptop camera ', this.vidFlag)
      console.log('heres video!! ', this.video)
      this.video = this.video.nativeElement;
      console.log('heres video!! ', this.video)
      
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then(stream => {
              this.video.src = window.URL.createObjectURL(stream);
              this.video.play();
            })
          }
    }
    else {
      Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.imageUrl = "data:image/png;base64," + imageData;
      console.log('heres the image from photo shot ', imageData)
      console.log('changes made!', this.imageUrl)
      this.saveImage(this.imageUrl);
      }, (err) => {
        console.log('Error on review takePhoto function ', err)
      })
    }
  }

   accessGallery(){
     if (this.platform.is("core")) {
       this.gallery = true;
       console.log('entering browser ')

     }
     else {
        Camera.getPicture({
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        destinationType: Camera.DestinationType.DATA_URL
        }).then((imageData) => {
          this.imageUrl = 'data:image/jpeg;base64,'+imageData;
          this.saveImage(this.imageUrl);
        }, (err) => {
          console.log(err);
        });
      }

  }

  saveImage(image) {
    console.log('heres the image ', image)
      let body = {
        "file": image,
        "upload_preset": "yi4d6zwf"
      }
      console.log('body parameters ', body)
      return this.http.post("https://api.cloudinary.com/v1_1/ddy7oiu4u/image/upload", body)
        .map((data: Response) => {
          console.log('heres the data page ', data)
          console.log('heres the data page ', data.json().url)
          return data.json().url;
        })
        .subscribe(url => {
          console.log("saved image results ", url)
          this.cloudinaryUrl = url
          this.readyMark = true;
        })
      }
  
}
