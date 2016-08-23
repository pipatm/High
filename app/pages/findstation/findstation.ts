import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation, GoogleMap, GoogleMapsEvent } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/findstation/findstation.html'
})
export class FindStationPage {
  
  private isGeo = false;

  constructor(private navCtrl: NavController,private platform: Platform) {
    console.log('platform ready');
    this.platform.ready().then( ()=> {
      if(Geolocation){
        this.getLocation().then( (latlng) => {
            console.log('Geolocation ready');
            this.isGeo = true;
            let lat = latlng.getLat();
            let lng = latlng.getLng();
            let map = this.initMap('map');
            this.drawMap(map);
        }).catch( (e) => {
          console.log(e);
        });
      }
      else{
        console.log('no geoing');
      }
    });
  }
  /*
  * Get latitude and longitude
  * return Promise of LatLng
  */
  getLocation() : Promise<LatLng> {
    return new Promise( (resolve,reject) => {
      Geolocation.getCurrentPosition({timeout: 60000,enableHighAccuracy:true}).then( (position) =>{
        console.log('Geolocation getCurrentPosition!!') 
        resolve(new LatLng(position.coords.latitude, position.coords.longitude));
        reject('Geolocation Error');
      }).catch( (e) =>{
        console.log(e);
      });
    });
  }
  /*
  * Create GoogleMap instance
  * id: String is <div> identifier 
  * return GoogleMap
  */
  initMap(id:string):GoogleMap{
    GoogleMap.isAvailable().then( () => {
      return new GoogleMap(id);
    }).catch( (e) => {
      console.log(e);
    });
    return null;
  }
  /*
  * draw map
  * map: GoogleMap is GoogleMap instance
  * return void
  */
  drawMap(map:GoogleMap):void{
    GoogleMap.isAvailable().then( () => {
      map.on(GoogleMapsEvent.MAP_READY).subscribe( () => {
        console.log('map event ready');
        map.setVisible(true);
      });
    });
  }

}

class LatLng{
  private lat: number;
  private lng: number;
  constructor(la: number,ln: number){
    this.lat = la;
    this.lng = ln;
  }
  getLat():number{
    return this.lat;
  }
  getLng():number{
    return this.lng;
  }
}