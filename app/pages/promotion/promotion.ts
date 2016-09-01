import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { PromotionDetailPage } from '../promotion-detail/promotion-detail';

@Component({
  selector: 'promotion',
  templateUrl: 'build/pages/promotion/promotion.html'
})
export class PromotionPage {
  item: Array<string>;
  items: Array<{'img': string, 'shortdetail': string,'essologo': string,'otherlogo': string, 'detail': string}>;
  login: Array<{'img': string}>;

  constructor(private navCtrl: NavController) {
    this.login = [];
    this.login.push({'img':'build/img/Login.jpg'});

    this.items = [];
    this.items.push({'img':'build/img/Tesco.jpg','shortdetail':'Tesco Points','essologo': 'build/img/Logo.png', 'otherlogo': 'build/img/smalltesco.png','detail': 'Conversely, 10,000 Tesco-Lotus Club Card Points can also be converted to 500 Esso Smiles Driver Rewards Points.'});
    this.items.push({'img':'build/img/AirAsia.jpg','shortdetail':'AirAsia Points','essologo': 'build/img/Logo.png', 'otherlogo': 'build/img/smallairasia.png','detail': 'Convert Esso Smiles Driver Rewards Points to mileages of Air Asia BigPoint for 500 points to redeem for air ticket.'});
    console.log(this.items);
  }

  presentDetail(item){
    this.navCtrl.push(PromotionDetailPage, {
       item: item
     });
  }
  gotoLogin(){
    this.navCtrl.push(LoginPage);
  }
  
}
