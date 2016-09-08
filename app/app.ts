import {Component, OnInit} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import { Network } from 'ionic-native';
import { OneSignal } from 'ionic-native';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp implements OnInit{

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
  ngOnInit(){
    let network = Network.connection;
    if(network === 'none'){
      alert("Please Connect to the Internet");
    }
    else{
      OneSignal.init('6466cfe1-cae7-40e0-afce-48052ed5104e',{googleProjectNumber: '495095340641',autoRegister: true})
      .subscribe(jsonData => {
        console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
      });

      OneSignal.enableInAppAlertNotification(true);
    }
  }
}

ionicBootstrap(MyApp);
