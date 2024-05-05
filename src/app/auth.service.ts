import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { userPoolId, userPoolWebClientId } from '../../auth_config.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userPool: any;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: userPoolId,
      ClientId: userPoolWebClientId
    });
  }

  signUp(email: string, password: string) {
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email_alias', Value: email })
    ];

    return new Promise((resolve, reject) => {
      this.userPool.signUp(email, password, attributeList, null, (err: Error, result:any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.user);
        }
      });
    });
  }

  confirmSignUp(email: string, code: string) {
    const user = new CognitoUser({
      Username: email,
      Pool: this.userPool
    });

    return new Promise((resolve, reject) => {
      user.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  signIn(email: string, password: string) {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    const user = new CognitoUser({
      Username: email,
      Pool: this.userPool
    });

    return new Promise((resolve, reject) => {
      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        }
      });
    });
  }

  signOut() {
    const user = this.userPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  }

  isAuthenticated(): boolean {
    const user = this.userPool.getCurrentUser();
    return user !== null;
  }

  getCurrentUser(): any {
    return this.userPool.getCurrentUser();
  }

}
