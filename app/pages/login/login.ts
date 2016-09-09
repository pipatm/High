import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RegisterPage } from '../register/register';

import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  templateUrl: 'build/pages/login/login.html',
})


export class LoginPage {
	toRegister = RegisterPage;

  	loginform: FormGroup;

	sUsername: string;
	sPassword: string;

  	private myData: any;


  constructor(	private navCtrl: NavController, 
  				private formBuilder: FormBuilder, 
  				private http: Http, 
  				public alertCtrl: AlertController) {

  		this.loginform = formBuilder.group({
        	sUsername: ['', Validators.required],
        	sPassword: ['', Validators.required]
      });

  }

	onSubmit(formData) {
		var url = "http://ghl.co.th:1100/EXXON_WebService/ExxonWebService.svc/GetCardInfo";
		let erralert = this.alertCtrl.create({
			title: 'Cannot Login',
			subTitle: 'Incorrect Username or Password',
			buttons: ['OK']
		});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    	if(formData.valid) {
      		this.myData = formData.value;
      		//console.log(this.myData);
      		//console.log(url);

      		this.http.post(url, JSON.stringify(this.myData), options)
    			.map(res => res.json())
    			.subscribe(
      				data => this.saveJwt(formData.sToken),
      				err => this.logError(err),
      				() => console.log('Authentication Complete')
    			);
    	}
    	else{
    		erralert.present();
    	}

  	}	
  	saveJwt(jwt) {
  		if(jwt) {
    		localStorage.setItem('sToken', jwt)
  		}
	}
	logError(err) {
  		console.error('There was an error: ' + err);
	}
}
