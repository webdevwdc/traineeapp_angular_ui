import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthLocalService } from '../authentication/auth-local.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-facebook-auth',
  templateUrl: './facebook-auth.component.html',
  styleUrls: ['./facebook-auth.component.css']
})
export class FacebookAuthComponent implements OnInit {

  registrationForm;
  SuccessMessage;
  ErrorMessage;
  ErrorMessageShow;
  userData = {};
  data;

  constructor(private authservice: AuthLocalService, private router: Router, private activatedRoute: ActivatedRoute, public http: Http) {
    this.registrationForm = new FormGroup({
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]))
      , role: new FormControl("", Validators.required)
      , first_name: new FormControl("", Validators.required)
      , last_name: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    let params: any = this.activatedRoute.snapshot.params;

    this.http.get('http://203.163.248.214:1900/user/trainee/' + params.id)
      .subscribe((data) => {
        this.data = data.json();
        this.userData = this.data.data;
      });
  }

  onSubmit = function () {
    if (this.registrationForm.dirty && this.registrationForm.valid) {

      //console.log(this.createDataset(this.userData));
      let _me = this;
      const req = new XMLHttpRequest();
      req.open('POST', 'http://203.163.248.214:1900/user/update', true);
      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      req.onload = function () {
        localStorage.setItem('user', JSON.stringify(_me.userData));
        _me.router.navigate(['/dashboard/dashboard']);
      };
      req.send(this.createDataset(this.userData));

    } else {
      this.ErrorMessageShow = true;
    }
  }

  createDataset(obj) {
    var str = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
      }
    }
    return str.join("&");
  }

}
