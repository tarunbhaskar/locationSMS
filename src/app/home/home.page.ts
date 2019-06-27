import { Component, ViewChild, ElementRef } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';
//import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderReverseResult } from '@ionic-native/native-geocoder/ngx';
import { GetDetailsService } from "../services/get-details.service";
import { RetrieveDetailService } from "../services/retrieve-detail.service";
import { UpdateLocationService } from "../services/update-location.service";
import { UploadToS3Service } from "../services/upload-to-s3.service";
import { CognitoServiceService } from "../services/cognito-service.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';



import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers:[SMS]
})
export class HomePage {

	public data: string = '';
	public latitude: any;
	public longitude: any;
	public address : any;
	public presentReston: any;
	public presentHerndon: any;
	public presentDreamway: any;
	public personLocation: any;
	sms:any;
  private showMessageCard : boolean = false;
  private textMessage:string ;


    responseObj:any;
  watchLocationUpdates:any; 
  loading:any;
  isWatching:boolean;
  email: string = '';
  public allUserData:any;
  public loggedUser: string = '';
  public smsNumbers :string[] = [];
  public timer: any;

  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

//, 
	constructor( private smsVar: SMS , public loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    public retrieveDetail: RetrieveDetailService,
    public getDetail: GetDetailsService,
    public updateLocationService: UpdateLocationService,
    private route: ActivatedRoute,
    public router: Router,
    public uploadToS3Service: UploadToS3Service,
    public CognitoService: CognitoServiceService,
    private nativeGeocoder: NativeGeocoder) {

  }

  ngAfterViewInit() {


     this.route.params.subscribe(params => {
      this.email = params['email'];
    });
    
    this.getAllUsers();
     this.retrieveUser(this.email);
}

  async presentLoading() {
  	this.loading = true;
  }

    async dismissLoading() {
    	this.loading = false;
  }

  refreshLocationEveryHour(){

         let hours = moment().format('HH:mm');
    let  workingHours: number = parseInt(hours);


      let currentDate = new Date();
      let weekendDay: string = '';

      let weekends = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday" , "Friday" , "Saturday"];
weekendDay = weekends[currentDate.getDay()];

    if(weekendDay === 'Sunday' || weekendDay === 'Saturday'  ){
        clearInterval(this.timer);
        this.timer= null;
        alert("location is disable over the weekends!");
    }else {

      if(workingHours < 7 || workingHours > 22){
           clearInterval(this.timer);
           this.timer= null;
        alert("location is disable before/after office hours !!");
      }else{
        this.getGeolocation();
        this.timer = setInterval(this.getGeolocation , 1000 * 60 *60);
      }

        
    }

         
    }

     //Get current coordinates of device
    getGeolocation(){
           this.presentLoading();
      this.geolocation.getCurrentPosition().then((resp) => {
        this.responseObj = resp.coords; 
       // this.hideLoader();
        if(this.responseObj !== null){
      this.getGeoencoder(this.responseObj.latitude,this.responseObj.longitude);
        }
       
       }).catch((error) => {
         alert('Error getting location'+ JSON.stringify(error));
        this.dismissLoading();
       });
    

 
    }
  
    //geocoder method to fetch address from coordinates passed as arguments
    getGeoencoder(latitude,longitude){
     // this.showLoader();
      this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.responseObj.address = this.generateAddress(result[0]);
      	this.findAvailableAddress(this.responseObj.address);
      })
      .catch((error: any) => {
        alert('Error getting location'+ JSON.stringify(error));
        this.dismissLoading();
      
      });
    }
  
    //Return Comma saperated address
    generateAddress(addressObj){
        let obj = [];
        let address = "";
        for (let key in addressObj) {
          obj.push(addressObj[key]);
        }
        obj.reverse();
        for (let val in obj) {
          if(obj[val].length)
          address += obj[val]+', ';
        }
        alert("address" + address.slice(0, -2));
      return address.slice(0, -2);
    }

    findAvailableAddress(availableAddress){

      if(availableAddress.indexOf('12000') > -1 && availableAddress.indexOf('Sunrise Valley Dr') > -1 && availableAddress.indexOf('Reston') > -1){
          this.personLocation = 'RCR';
        }else if(availableAddress.indexOf('11600') > -1 && availableAddress.indexOf('American Dream Way') > -1 && availableAddress.indexOf('Reston') > -1){
            this.personLocation = 'RDC';
        } else if(availableAddress.indexOf('13150') > -1 && availableAddress.indexOf('Worldgate Dr') > -1 && availableAddress.indexOf('Herndon') > -1){
            this.personLocation = 'OB1/OB2';
        }else{
          this.personLocation = 'unknown';
        }

        this.updateLocation(this.email, this.personLocation);


   this.dismissLoading();
}

			  send(num){
    this.showMessageCard = true;
    this.smsNumbers = num;
  }

  sendSMS(num){
    let options={
          replaceLineBreaks: true,
          android: {
                    intent: 'INTENT' 
                }

    }


     this.smsVar.send(this.smsNumbers, this.textMessage ,options)
      .then(()=>{
        alert("Message sent successfully!");
        this.showMessageCard = false;
      },()=>{
      alert("Message not sent sucessfully");
      this.showMessageCard = false;
      });
}

 sendSMSToEveryone(){
   
    let options={
          replaceLineBreaks: true,
          android: {
                    intent: 'INTENT' 
                }

    }


     this.smsVar.send(this.smsNumbers, this.textMessage ,options)
      .then(()=>{
        alert("Message sent successfully!");
        this.showMessageCard = false;
      },()=>{
      alert("Message not sent sucessfully");
      this.showMessageCard = false;
      });
}
   

  close(){
    this.showMessageCard = false;
  }

   getAllUsers() {
  this.getDetail.getData()
    .subscribe(res => {
      this.allUserData = res.Items;
       this.allUserData.forEach(function(data){
         if(data && data.contact !== null && data.contact !== undefined ){
           this.smsNumbers.push(data.contact);
         }
       },this);

       
    }, err => {
      console.log(err);
       this.loading = false;
    });
}

   retrieveUser(email) {
  this.retrieveDetail.retrieveUser(email)
    .subscribe(res => {
      this.loggedUser = res['Item'].CUSTOMER_NAME;
    }, err => {
      console.log(err);
    });
}

   updateLocation(email, locationAvailable) {
  this.updateLocationService.updateLocation(email, locationAvailable)
    .subscribe(res => {
      alert('Location Updated Sucessfully');
      this.getAllUsers();
    }, err => {
      console.log(err);
    });
}

pollDisable(){

   clearInterval(this.timer);
    this.timer = null;
}

logout(){

   clearInterval(this.timer);
    this.router.navigate(['/login']);
}


fileEvent(fileInput: any) {
 

  this.uploadToS3Service.fileEvent(fileInput, this.CognitoService.getToken());
}

}
