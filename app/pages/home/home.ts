import { Component, Directive } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PromotionPage } from '../promotion/promotion';
import { PointsPage } from '../points/points';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [ PromotionPage,PointsPage ],
})
export class HomePage {
  isLogin: boolean;
  login: Array<{'img': string}>;

  constructor(private navCtrl: NavController) {
    this.isLogin = false;
    this.login = [];
  }

  gotoLogin(){
    this.navCtrl.push(LoginPage);
  }

}
