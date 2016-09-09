import {Component} from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Directive} from 'ionic2-input-mask';
import { Register2Page } from '../register-2/register-2';

import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/register/register.html',
  directives: [Directive]
})
export class RegisterPage {

  registform1: FormGroup;
  toRegister2 = Register2Page;
  private myData: any;
  
  //In case if want to use a ui mask, enable this
  //public mask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  //public mask2 = [/\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/, '-',/\d/];


  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private http: Http, 
              public alertCtrl: AlertController) {
      
  		this.registform1 = formBuilder.group({
        sCardNumber: ['', Validators.required],
        sCitizenID: ['', Validators.required],
        sEmail: ['', Validators.required]
      });


  }

  onSubmit(formData) {
    var url = "http://ghl.co.th:1100/EXXON_WebService/ExxonWebService.svc/CardValidation"
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

    this.navCtrl.push(Register2Page, {
      sCardNumber: formData.value.sCardNumber, sCitizenID: formData.value.sCitizenID, sEmail: formData.value.sEmail
    });

  }

  logError(err) {
      console.error('There was an error: ' + err);
  }


 /*
  checkID(id) {
    if(id.length != 13){ 
      return false;
    }
    for(i=0, sum=0; i < 12; i++){
      sum += parseFloat(id.charAt(i))*(13-i);
    }
    if((11- sum %11)%10!=parseFloat(id.charAt(12))){
        return false;
    }
    return true;
  }*/


}
