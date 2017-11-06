import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthLocalService } from '../../auth-local.service';
import { Router } from '@angular/router';

import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, SocialUser } from "angular4-social-login";

@Component({
  selector: 'app-with-social',
  templateUrl: './with-social.component.html'
})
export class WithSocialComponent implements OnInit {


  loginForm;
  SuccessMessage;
  ErrorMessage;
  ErrorMessageShow;

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authservice: AuthLocalService, private router: Router, private authSocialService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]))
      , password: new FormControl("", Validators.required)
      , rememberMe: new FormControl(false)
    });
  }

  ngOnInit() {

    if (localStorage.getItem('userAuth')) {
      if (JSON.parse(localStorage.getItem('userAuth')).rememberMe) {

        this.loginForm = new FormGroup({
          email: new FormControl(JSON.parse(localStorage.getItem('userAuth')).email)
          , password: new FormControl(JSON.parse(localStorage.getItem('userAuth')).password)
          , rememberMe: new FormControl(true)
        });
      }
    }
    localStorage.removeItem('user');

    //this.signOut();
    this.authSocialService.authState.subscribe((user) => {
      //this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authSocialService.authState.subscribe((guser) => {
      this.authservice.userSocialUpdateGoogle(guser).subscribe((res) => {
        if (res.is_new == "yes") {
          this.router.navigate(['/facebook-auth/', res.data[0]._id]);
        }
        else if (res.is_new == "no") {
          localStorage.setItem('user', JSON.stringify(res.data[0]));
          this.router.navigate(['/dashboard/dashboard']);
        }
      });
      this.loggedIn = (guser != null);
    });
  }

  signInWithFB(): void {
    this.authSocialService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authSocialService.authState.subscribe((fuser) => {
      this.authservice.userSocialUpdate(fuser).subscribe((res) => {
        if (res.is_new == "yes") {
          this.router.navigate(['/facebook-auth/', res.data[0]._id]);
        }
        else if (res.is_new == "no") {
          localStorage.setItem('user', JSON.stringify(res.data[0]));
          this.router.navigate(['/dashboard/dashboard']);
        }
      });
      this.loggedIn = (fuser != null);
    });
  }

  signOut(): void {
    this.authSocialService.signOut();
  }

  onSubmit = function () {

    if (this.loginForm.valid) {
      this.authservice.userLogin(this.loginForm.value).subscribe((res) => {

        if (res.status == 200) {
          if (this.loginForm.value.rememberMe) {
            if (localStorage.getItem('userAuth')) {
              localStorage.removeItem('userAuth');
            }
            localStorage.setItem('userAuth', JSON.stringify(this.loginForm.value));
          }

          localStorage.setItem('user', JSON.stringify(res.data));
          this.router.navigate(['/dashboard/dashboard']);
        }
        else
          this.ErrorMessage = res.message;
      });
    }
    else {
      this.ErrorMessageShow = true;
    }
  }


}
