import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SearchmorePage } from '../searchmore/searchmore';
import { PaymentPage } from '../payment/payment'
import { Bookartist } from '../../providers/bookartist';
import { Apptcal } from '../../providers/apptcal';
import { AlertController } from 'ionic-angular';
import { NailtechdashboardPage } from '../nailtechdashboard/nailtechdashboard';
import { NailartistpagePage } from '../nailartistpage/nailartistpage';
import { ProfilePicsRevs } from '../../providers/profile-pics-revs';
import { Calendar } from  'ionic-native'

declare var google;

// const markers = [
//   {
//     firstName: 'George',
//     lastName: 'Cantstanya',
//     insta: '@georgy-castans',
//     pic: 'http://vignette1.wikia.nocookie.net/seinfeld/images/7/76/George-costanza.jpg/revision/latest?cb=20110406222711',
//     lat: 34.004433544879845,
//     lng: -118.26428236523441
//   },
//   {
//     firstName: 'Elaine',
//     lastName: 'Benes',
//     insta: '@lainy-benes',
//     pic: 'https://upload.wikimedia.org/wikipedia/en/3/33/Elaine-benes-3707.jpg',
//     lat: 34.031751959497065,
//     lng: -118.22857679882816
//   },
//   {
//     firstName: 'Jerry',
//     lastName: 'Seinfeld',
//     insta: '@jerry-feld',
//     pic: 'http://www.watch-id.com/sites/default/files/upload/sighting/Breitling-watch-Jerry-Seinfeld-2.jpg',
//     lat: 33.963724192230046,
//     lng: -118.20660414257816
//   },
//   {
//     firstName: 'Cosmo',
//     lastName: 'Kraimer',
//     insta: '@cosmo-kraimer',
//     pic: 'https://s-media-cache-ak0.pinimg.com/originals/5e/ec/e4/5eece4dbe2ba07b0bbb70812680cdc54.jpg',
//     lat: 34.03630417378081,
//     lng: -118.27801527539066
//   }
// ]

@Component({
  selector: 'page-bestmatch',
  templateUrl: 'bestmatch.html'
})

export class BestmatchPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  data: any;

  bestmatch: any;

  bookInfo: any;

  userInfo: any;

  cal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private bookArtist: Bookartist, public alertCtrl: AlertController, private fetchData:ProfilePicsRevs) {
    // interface Window {
    //   plugins: any;
    // }
    // this.cal =  window.plugins.calendar;
    this.data = this.navParams.get("data").response;
    this.bookInfo = this.navParams.get("data").bookInfo;
    this.userInfo =  this.navParams.get("data").userInfo;
    this.bestmatch = this.data[0];
  }

  ionViewDidLoad(){
    console.log('about to load page and markers')
    this.loadMap();
    this.addMarker(this.data);
    console.log('this is params result data from the service request ', this.data)
    console.log('this is params bookInfo data from the service request ', this.bookInfo)
    console.log('this is params userInfo data', this.userInfo)
  //   Calendar.createCalendar('MyCalendar').then(
  //     (msg) => { console.log(msg); },
  //     (err) => { console.log(err); }
  //   );
  }
 
  loadMap(){
 
    let latLng = new google.maps.LatLng(34.052235, -118.243683);
 
    let mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
  }

  addMarker(nailArtist){
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: {lat: Number(nailArtist[0].latitude), lng: Number(nailArtist[0].longitude)}
      });
      //console.log('heres position ', marker.position)
 
      let content = `<h2> <b>${ nailArtist[0].firstName} ${nailArtist[0].lastName }</b> </h2>`;          
 
      this.addInfoWindow(marker, content);
 
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
 
    google.maps.event.addListener(marker, 'click', () => {
      if (!marker.open) {
        infoWindow.open(this.map, marker);
        marker.open = true;
      }
      else {
        infoWindow.close();
        marker.open = false;
      }

      google.maps.event.addListener(this.map, 'click', () => {
        infoWindow.close();
        marker.open = false;
      });
    });
  }

  searchMore(){
    this.navCtrl.push(SearchmorePage, {data: this.data, bookInfo: this.bookInfo});
  }

  seeProfile(profile){
    //console.log('profile button works!, ', profile)
    this.fetchData.fetchPicsRevs(profile)
      .subscribe(
        (data: any) => {
          console.log('heres the data from artist pics review services', data)
          this.navCtrl.push(NailartistpagePage, {nailArtistInfo: profile, nailArtistReviews: data, bookInfo: this.bookInfo});
      });
  }
  
  showAlert(nailArtist) {
    
    let alert = this.alertCtrl.create({
      title: 'Booking Confirmed!',
      subTitle: `Congratulations, you just booked ${nailArtist.firstName}!`,
      buttons: ['OK']
    });
    alert.present(nailArtist);
  }


  bookNailArtist(nailArtist){
    //console.log('just booked ', nailArtist);
    this.bookArtist.setBooking(nailArtist, this.bookInfo)
      .subscribe(
        (data: any) => {
          console.log('heres the data from book services', data)
          this.showAlert(nailArtist);
          this.navCtrl.push(NailtechdashboardPage, {data: this.data})
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
            console.log('Disagree clicked')
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked')
            this.sendToPayment()
            //this.bookNailArtist(nailArtist)
            //this.showAlert(nailArtist)
          }
        }
      ]
    });
    confirm.present();
  }
   sendToPayment() {
    this.navCtrl.push(PaymentPage, {bookInfo:this.bookInfo, userInfo: this.userInfo})

  }

  onInit
}
