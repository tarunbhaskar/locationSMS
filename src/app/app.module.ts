import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { CognitoServiceService } from "./services/cognito-service.service";
import { UploadToS3Service } from "./services/upload-to-s3.service";
import { GetDetailsService } from "./services/get-details.service";
import { AddDetailsService } from "./services/add-details.service";
import { RetrieveDetailService } from "./services/retrieve-detail.service";
import { UpdateLocationService } from "./services/update-location.service";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule,IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    SMS,
   NativeGeocoder,
   CognitoServiceService,
   UploadToS3Service,
   GetDetailsService,
   AddDetailsService,
   RetrieveDetailService,
   UpdateLocationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
