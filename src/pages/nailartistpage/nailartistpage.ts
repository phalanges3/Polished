import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { ProfilePicsRevs } from '../../providers/profile-pics-revs';
import { Bookartist } from '../../providers/bookartist';
import { NailtechdashboardPage } from '../nailtechdashboard/nailtechdashboard';
import { AlertController } from 'ionic-angular';
import { PaymentPage } from '../payment/payment'


// const albums = [
//       {
//         userId: 4,
//         pic: 'https://s-media-cache-ak0.pinimg.com/736x/33/ff/eb/33ffebd9cd1ba691f6ae772e639a2479.jpg'
//       },
//       {
//         userId: 4,
//         pic: 'http://bestartnails.com/wp-content/uploads/2016/03/nail-art-1382-250x250.jpg'
//       },
//       {
//         userId: 4,
//         pic: 'http://nailartstyle.com/wp-content/uploads/2016/06/25-acrylic-matte-nails-600x525.jpg?x97692'
//       },
//       {
//         userId: 4,
//         pic: 'https://s-media-cache-ak0.pinimg.com/originals/a1/a0/00/a1a000609baa9ac891e3bbc93c6d200e.jpg'
//       }
//     ]

// const comments = [
//       {
//         "id": 1,
//         "userId": 3,
//         "reviewed_first": "George",
//         "reviewed_last": "Castanza",
//         "reviewer_first": "Josh",
//         "reviewer_last": "Pace",
//         "reviewer_id": 4,
//         "profile_image_url": 'https://s-media-cache-ak0.pinimg.com/originals/5e/ec/e4/5eece4dbe2ba07b0bbb70812680cdc54.jpg',
//         "rating": 3,
//         "review_content": "He was really good! Arrived on time.",
//         "createdAt": "2017-01-02T23:03:12.497Z",
//         "updatedAt": "2017-01-02T23:03:12.497Z"
//       },
//       {
//         "id": 1,
//         "userId": 3,
//         "reviewed_first": "George",
//         "reviewed_last": "Castanza",
//         "reviewer_first": "Rob",
//         "reviewer_last": "Scheiner",
//         "reviewer_id": 4,
//         "profile_image_url": 'http://www.watch-id.com/sites/default/files/upload/sighting/Breitling-watch-Jerry-Seinfeld-2.jpg',
//         "rating": 5,
//         "review_content": "Very punctual and friendly. Overall, he was really good!",
//         "createdAt": "2017-01-02T23:03:12.497Z",
//         "updatedAt": "2017-01-02T23:03:12.497Z"
//       },
//       {
//         "id": 1,
//         "userId": 3,
//         "reviewed_first": "George",
//         "reviewed_last": "Castanza",
//         "reviewer_first": "Jose",
//         "reviewer_last": "Cuchilla",
//         "reviewer_id": 4,
//         "profile_image_url": 'https://upload.wikimedia.org/wikipedia/en/3/33/Elaine-benes-3707.jpg',
//         "rating": 1,
//         "review_content": "Wow, great experience and customer service! Would recommend again! Def a good person to get nail art from.",
//         "createdAt": "2017-01-02T23:03:12.497Z",
//         "updatedAt": "2017-01-02T23:03:12.497Z"
//       }
//     ]

@Component({
  selector: 'page-nailartistpage',
  templateUrl: 'nailartistpage.html'
})
export class NailartistpagePage {
  @ViewChild('mySlider') slider: Slides;
  mySlideOptions = {
    initialSlide: 0,
    autoplay: 2000,
    loop: true,
    pager: false
  };

  nailArtistInfo: any;
  nailArtistReviews: any;
  bookInfo: any;
  reviewFlag= true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fetchData:ProfilePicsRevs, private bookArtist: Bookartist, public alertCtrl: AlertController) {
    this.nailArtistInfo = this.navParams.get("nailArtistInfo");
    this.nailArtistReviews = this.navParams.get("nailArtistReviews");
    if(this.nailArtistReviews.length===0){
      this.reviewFlag=false;
    }
    this.bookInfo = this.navParams.get("bookInfo");
    console.log(this.nailArtistReviews, "nailArtistReviews")
  }

  

  ionViewDidLoad() {
    console.log('nailArtistInfo ', this.nailArtistInfo);
    console.log('nailArtistReviews ', this.nailArtistReviews)
  }

  // loadData(artist) {
  //   this.fetchData.fetchPicsRevs(artist)
  //     // .subscribe(
  //     //   (data: any) => {
  //     //     console.log('heres the data from artist pics review services', data)
  //     // });
  // }

    showAlert(nailArtist) {
    
      let alert = this.alertCtrl.create({
        title: 'Booking Confirmed!',
        subTitle: `Congratulations, you just booked ${nailArtist.firstName}!`,
        buttons: ['OK']
      });
      alert.present(nailArtist);
    }

    bookNailArtist(artistInfo){
      console.log('just booked ', artistInfo);
      this.bookArtist.setBooking(artistInfo, this.bookInfo)
        .subscribe(
          (result: any) => {
            console.log('heres the data from book services', result)
            this.showAlert(artistInfo);
            this.navCtrl.push(NailtechdashboardPage, {data: result});
        });
    }

  confirmBooking(nailArtist) {
    let confirm = this.alertCtrl.create({
      title: 'Confirm Booking',
      message: `Are you sure you want to book ${nailArtist.firstName}?`,
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            //this.bookNailArtist(nailArtist);
            this.sendToPayment()
          }
        }
      ]
    });
    confirm.present();
  }
  sendToPayment() {
    this.navCtrl.push(PaymentPage, {bookInfo: this.bookInfo})

  }

}
