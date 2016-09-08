import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/register-2/register-2.html',
})
export class Register2Page {
  registform2: FormGroup;

  public sCardNumber: string;
  public sCitizenID: string;
  public sEmail: string;

  		private myData: any;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private http: Http, 
              public alertCtrl: AlertController) {

      this.sCardNumber = navParams.get("sCardNumber");
      this.sCitizenID = navParams.get("sCitizenID");
      this.sEmail = navParams.get("sEmail");

  		this.registform2 = formBuilder.group({
          sCardNumber: [this.sCardNumber, Validators.required],
          sCitizenID: [this.sCitizenID, Validators.required],
          sEmail: [this.sEmail, Validators.required],
        	sTitle: ['', Validators.required],
        	sFirstName: ['', Validators.required],
        	sLastName: ['', Validators.required],
        	sMobilePhone: ['', Validators.required]
      });


  }

  onSubmit(formData) {
    var url = "http://ghl.co.th:1100/EXXON_WebService/ExxonWebService.svc/UserRegistration";

    let erralert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Please enter correct information',
      buttons: ['OK']
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    if(formData.valid) {
      console.log(formData.value);
      this.myData = formData.value;

      this.http.post(url, JSON.stringify(this.myData), options)
          .map(res => res.json())
          .subscribe(
              data => alert('Your account has been created!'),
              err => this.logError(err),
              () => console.log('Authentication Complete')
          );
    }
  }
  
  logError(err) {
      console.error('There was an error: ' + err);
  }
}
