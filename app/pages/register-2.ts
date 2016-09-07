import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: 'build/pages/register-2/register-2.html',
})
export class Register2Page {
  registform2: FormGroup;
  		private myData: any;

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder) {
  		this.registform2 = formBuilder.group({
        	title: ['', Validators.required],
        	firstName: ['', Validators.required],
        	lastName: ['', Validators.required],
        	phone: ['', Validators.required]
      });

  }

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.myData = formData.value;
    }
  }
}
