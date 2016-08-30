import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/promotion-detail/promotion-detail.html',
})
export class PromotionDetailPage {
  item: any;
  title: string;
  imgban: string;
  essoLogo: string;
  otherLogo: string;
  essoPoint: string;
  otherPoint: string;
  detail: string;
  constructor(private navCtrl: NavController, navParams: NavParams) {
    this.item = navParams.get('item');
    this.title = this.item.shortdetail;
    this.imgban = this.item.img;
    this.essoLogo = this.item.essologo;
    this.otherLogo = this.item.otherlogo;
    this.detail = this.item.detail;
    this.essoPoint = '500';
    this.otherPoint = '3,000';
  }

}
