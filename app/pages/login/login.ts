import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';


@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

	toRegister = RegisterPage;
  constructor(private navCtrl: NavController) {

  }

}
