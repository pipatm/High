import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {
    
    profile: {'name': string, 'tel': string, 'email': string, 'cardID': string, 'tier': string, 'points': string};
  constructor(private navCtrl: NavController) {
    this.profile = {'name': 'Pipat Mungchitwisawakorn', 'tel': '081-234-5678', 'email': 'abc@gmail.com', 'cardID': '5678 0321 5146 8465', 'tier': 'GOLD', 'points': '250'};
  }

}
