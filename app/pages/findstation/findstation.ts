import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Geolocation, GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import { Diagnostic } from 'ionic-native';
import { InAppBrowser, InAppBrowserEvent} from 'ionic-native'; 

@Component({
  templateUrl: 'build/pages/findstation/findstation.html'
})
export class FindStationPage implements OnInit{
  
  private isGeo = false;

  constructor(private navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.init();
  }
  init(){
    let loader = this.loadingCtrl.create({
      content: "Retriving Your Location..."
    });
    if(Geolocation){
      loader.present();
      this.getLocation().then( (latlng) => {
          console.log('Geolocation ready');
          this.isGeo = true;
          let lat = latlng.getLat();
          let lng = latlng.getLng();
          this.initMap('map').then( (map) => {
            this.drawMap(map,lat,lng);
            loader.dismiss();
          });
      }).catch( (e) => {
        console.log(e);
        loader.dismiss();
        alert('Can not retrived your location.');
      });
    }
    else{
      console.log('no geoing');
      loader.dismiss();
    }
  }
  ngOnInit(){
    Diagnostic.isGpsLocationEnabled().then( (available) => {
      if(!available){
        Diagnostic.isNetworkLocationEnabled().then( (available) => {
          if(!available){
            alert("Pleasse enable Location Setting");
          }
        }).catch( (e) => {
          console.log(e);
        });
      }
    }).catch( (e) => {
      console.log(e);
    });
  }
  /*
  * Get latitude and longitude
  * return Promise of LatLng
  */
  getLocation() : Promise<LatLng> {
    return new Promise( (resolve,reject) => {
      Geolocation.getCurrentPosition({timeout: 5000,enableHighAccuracy:true}).then( (position) =>{
        resolve(new LatLng(position.coords.latitude, position.coords.longitude));
      }).catch( (e) => {
        resolve(e);
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
        map.setVisible(true);
        map.setZoom(15);
        map.setCenter(new GoogleMapsLatLng(lat,lng));
        map.addMarker({
          'position' : new GoogleMapsLatLng(lat,lng),
          'title': 'your location'
        });
      });
    });
  }
  /**
   * Call Native google map app 
   **/
  externalMap(): void{
    //InAppBrowser.open('comgooglemaps://?saddr=' + lat + ',' + lng + '&daddr=' + lat + ',' + lng + '&directionmode=driving', '_system');
    if(Geolocation){
        this.getLocation().then( (latlng) => {
            console.log('Geolocation ready');
            this.isGeo = true;
            let lat = latlng.getLat()+1;
            let lng = latlng.getLng()+1;
            InAppBrowser.open('google.navigation:q=' + lat + ',' + lng + '&mode=d', '_system');
        }).catch( (e) => {
          console.log(e);
          alert('Can not retrived your location.');
        });
      }
      else{
        console.log('no geoing');
      }
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