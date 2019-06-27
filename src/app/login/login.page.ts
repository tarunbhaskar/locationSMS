import { Component, OnInit } from '@angular/core';
import { SignupPage } from "../signup/signup.page";
import { ReactiveFormsModule } from '@angular/forms';
import { NavController, AlertController } from "@ionic/angular";
import { CognitoServiceService } from "../services/cognito-service.service";

import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	email: string;
  password: string;
  signUpPage = SignupPage;
   	items : any;
	loading: boolean = false;

  constructor( public navCtrl: NavController, private router: Router,  public alertController: AlertController, public CognitoService: CognitoServiceService) { }

  ngOnInit() {
  }

  async login(){

    this.CognitoService.authenticate(this.email,this.password)
    .then(res =>{
      console.log(res);
     this.responseSucessMessage(res);
    }, err =>{
    	this.responseErrorMessage(err);
      console.log(err);
    });
  }

   async  responseSucessMessage(res) {
   	  this.CognitoService.setToken(res && res.idToken && res.idToken.jwtToken);
    /*let alert = await this.alertController.create({
    	header: 'Alert',
      message: "Success",
       buttons: ['OK']
    });
  await  alert.present();*/

  this.router.navigate(['/home', {email: this.email}]);

 // this.getItemData();
  }

     async  responseErrorMessage(err) {
     	let msg = err && err.message;
    let alert = await this.alertController.create({
    	header: 'Alert',
      message: msg,
       buttons: ['OK']
    });
  await  alert.present();
  }

}
