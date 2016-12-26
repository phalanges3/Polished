import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get("data");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchmorePage');
    console.log('this is the params data ', this.data);
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
 
      let content = `<h4> ${ nailArtist[i].firstName} ${nailArtist[i].lastName } </h4>`;          
 
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

}
