import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {
    
    profile: {'name': string, 'tel': string, 'email': string, 'cardID': string, 'tier': string, 'points': string};
  constructor(private navCtrl: NavController) {
    this.profile = {'name': 'Pipat Mungchitwisawakorn', 'tel': '081-234-5678', 'email': 'abc@gmail.com', 'cardID': '5678 0321 5146 8465', 'tier': 'GOLD', 'points': '250'};
  }
}
