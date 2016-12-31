import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Bookartist } from '../../providers/bookartist';

/*
  Generated class for the Searchmore page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var google;

@Component({
  selector: 'page-searchmore',
  templateUrl: 'searchmore.html'
})

export class SearchmorePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  
  data: any;

  bookInfo: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private bookArtist: Bookartist) {
    this.data = this.navParams.get("data");
    this.bookInfo = this.navParams.get("bookInfo");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchmorePage');
    console.log('this is the params data inside searchmore ', this.data);
    this.loadMap();
    this.addMarkers(this.data);
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

  addMarkers(nailArtist){
    for (var i = 0; i < nailArtist.length; i++) {
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: {lat: nailArtist[i].lat, lng: nailArtist[i].lng}
      });
      console.log('heres position ', marker.position)
 
      let content = `<h4> <b>${ nailArtist[i].firstName} ${nailArtist[i].lastName }</b> </h4>`;          
 
      this.addInfoWindow(marker, content);
    }
 
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

  seeProfile(profile){
    console.log('profile button works!, ', profile)
    // Josh, the code below should redirect you to the profilePage...just change the 'profilePage' reference to your component page
    // this.navCtrl.push(profilePage, {data: profile});
  }

  bookNailArtist(nailArtist){
    //console.log('just booked ', nailArtist);
    this.bookArtist.setBooking(nailArtist, this.bookInfo)
      .subscribe(
        (data: any) => {
          console.log('heres the data from book services inside searchmore page', data)
      });
  }

}
