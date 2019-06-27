import { Injectable } from '@angular/core';
import * as AWSCognito from "amazon-cognito-identity-js";

@Injectable({
  providedIn: 'root'
})
export class CognitoServiceService {

	private authToken: any;

	REGION: "us-east-1";

	_POOL_DATA = {
   UserPoolId: "us-east-1_LtXThCuGw",
   ClientId: "13h6ut79ar21qsgb3ejuvjf82t"
};

  constructor() { }

   signUp(email, password) {
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      let userAttribute = [];
      userAttribute.push(
        new AWSCognito.CognitoUserAttribute({ Name: "email", Value: email })
      );
      userAttribute.push(
        new AWSCognito.CognitoUserAttribute({Name: "name", Value: name})
      );

      userPool.signUp(email, password, userAttribute, null, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolved(result);
        }
      });
    });
  }


   confirmUser(verificationCode, userName) {
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      const cognitoUser = new AWSCognito.CognitoUser({
        Username: userName,
        Pool: userPool
      });

      cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolved(result);
        }
      });
    });
  }



  authenticate(email, password) {
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      const authDetails = new AWSCognito.AuthenticationDetails({
        Username: email,
        Password: password
      });

      const cognitoUser = new AWSCognito.CognitoUser({
        Username: email,
        Pool: userPool
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: result => {
          resolved(result);
        },
        onFailure: err => {
          reject(err);
        },
        newPasswordRequired: userAttributes => {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          // the api doesn't accept this field back
          userAttributes.email = email;
          delete userAttributes.email_verified;

          cognitoUser.completeNewPasswordChallenge(password, userAttributes, {
            onSuccess: function(result) {},
            onFailure: function(error) {
              reject(error);
            }
          });
        }
      });
    });
  }

  getToken() : any{
  	return	this.authToken 
  }

  setToken (token) : any{
  		this.authToken = token;
  }
}
