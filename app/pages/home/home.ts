import { Component, Directive } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PromotionPage } from '../promotion/promotion';
import { PointsPage } from '../points/points';

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [ PromotionPage,PointsPage ]
})
export class HomePage {
  isLogin: boolean;
  constructor(private navCtrl: NavController) {
    this.isLogin = true;
  }
}
