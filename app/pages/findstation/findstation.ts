import { Component,OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation, GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import { Diagnostic } from 'ionic-native'; 

@Component({
  templateUrl: 'build/pages/findstation/findstation.html'
})
export class FindStationPage implements OnInit{
  
  private isGeo = false;

  constructor(private navCtrl: NavController,private platform: Platform) {
    this.platform.ready().then( ()=> {
      console.log('platform ready');
      if(Geolocation){
        this.getLocation().then( (latlng) => {
            console.log('Geolocation ready');
            this.isGeo = true;
            let lat = latlng.getLat();
            let lng = latlng.getLng();
            this.initMap('map').then( (map) => {
              this.drawMap(map,lat,lng);
            });
        }).catch( (e) => {
          console.log(e);
        });
      }
      else{
        console.log('no geoing');
      }
    });
  }
  ngOnInit(){
    console.log('OnInit ready');
    Diagnostic.isGpsLocationEnabled().then( (available) => {
      console.log("1:aviil = " + available);
      if(!available){
        Diagnostic.isNetworkLocationEnabled().then( (available) => {
          console.log("2: avail = " + available);
          if(!available){
            alert("Pleasse enable Location Setting");
          }
        }).catch( (e) => {
          console.log("2: e = " + e);
        });
      }
    }).catch( (e) => {
      console.log("1: e = " + e);
    });
  }
  /*
  * Get latitude and longitude
  * return Promise of LatLng
  */
  getLocation() : Promise<LatLng> {
    return new Promise( (resolve,reject) => {
      Geolocation.getCurrentPosition({timeout: 60000,enableHighAccuracy:true}).then( (position) =>{
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
  initMap(id:string):Promise<GoogleMap>{
    return new Promise( (sucess,error) => {
      GoogleMap.isAvailable().then( () => {
        sucess(new GoogleMap(id));
      }).catch( (e) => {
        error(e);
      });
    });
  }
  /*
  * draw map
  * map: GoogleMap is GoogleMap instance
  * return void
  */
  drawMap(map:GoogleMap,lat:number,lng:number):void{
    GoogleMap.isAvailable().then( () => {
      map.on(GoogleMapsEvent.MAP_READY).subscribe( () => {
        console.log('map event ready');
        map.setCenter(new GoogleMapsLatLng(lat,lng));
        map.setVisible(true);
        map.setZoom(15);
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