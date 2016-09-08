import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {
    
    profile: {'name': string, 'tel': string, 'email': string};
  constructor(private navCtrl: NavController) {
    this.profile = {'name': 'Mr. Pipat Mungchitwisawakor', 'tel': '081-234-5678', 'email': 'abc@gmail.com'};
  }
}
