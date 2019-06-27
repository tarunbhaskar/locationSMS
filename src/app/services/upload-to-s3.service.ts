import { Injectable } from '@angular/core';
import { CognitoServiceService } from "./cognito-service.service";
import * as aws from "aws-sdk";

@Injectable({
  providedIn: 'root'
})
export class UploadToS3Service {
	image: any;
  accessToken: any;

  constructor() { }


fileEvent(fileInput: any, accessToken) {
  const region = "us-east-1";
  const bucketName = 'takeapictest';
  const file = fileInput.target.files[0];
//Configures the AWS service and initial authorization
  aws.config.update({
    region: region,
    credentials: new aws.CognitoIdentityCredentials({
       IdentityPoolId: 'us-east-1:59c6f274-4254-4993-b5ec-7aae49df306a',
      Logins: {
        "cognito-idp.us-east-1.amazonaws.com/us-east-1_LtXThCuGw": accessToken  
      }
    })
  });
//adds the S3 service, make sure the api version and bucket are correct
  const s3 = new aws.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: 'takeapictest'}
  });
//I store this in a variable for retrieval later
  this.image = file.name;
   var data = {
      Bucket: 'takeapictest',
      Key: this.image,
      Body: this.image,
      ContentEncoding: "base64",
      ContentType: "image/jpeg"
    };

    s3.putObject(data, (err, res) => {
      alert("inside put" + data);
      if (err) {
       
        alert("inside put error" + err);
      } else {
         
        alert("inside resolve" + res);
      }
    });
}

}
