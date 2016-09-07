import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Directive} from 'ionic2-input-mask';
import { Register2Page } from '../register-2/register-2';

@Component({
  templateUrl: 'build/pages/register/register.html',
  directives: [Directive]
})
export class RegisterPage {

  registform1: FormGroup;
  toRegister2 = Register2Page;
  private myData: any;
  
  public mask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public mask2 = [/\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/, '-',/\d/];


  constructor(private navCtrl: NavController, private formBuilder: FormBuilder) {
      
  		this.registform1 = formBuilder.group({
        cardID: ['', Validators.required],
        citizenID: ['', Validators.required],
        email: ['', Validators.required]
      });
  }

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.myData = formData.value;
    }
  }
}
