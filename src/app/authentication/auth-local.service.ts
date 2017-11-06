import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AuthLocalService {

  constructor(private http: Http) { }

  userSignUp(d) {
    return this.http.post('http://203.163.248.214:1900/user/signup', d).map(
      (response) => response.json()
    );
  }

  userLogin(d) {
    return this.http.post('http://203.163.248.214:1900/user/login', d).map(
      (response) => response.json()
    );
  }

  forgotPassword(d) {
    return this.http.post('http://203.163.248.214:1900/user/forgotpassword', d).map(

      (response) => response.json()
    );
  }

  userSocialUpdate(d) {
    //console.log(d);
    return this.http.post('http://203.163.248.214:1900/user/updateSocial', d).map(
      (response) => response.json()
    );
  }

  userSocialUpdateGoogle(d) {
    //console.log(d);
    return this.http.post('http://203.163.248.214:1900/user/googleSignup', d).map(
      (response) => response.json()
    );
  }
}
