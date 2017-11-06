import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLocalService } from '../auth-local.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html'
})
export class ForgotComponent implements OnInit {


  forgotpwdForm;
  SuccessMessage;
  ErrorMessage;
  ErrorMessageShow;
  constructor(private fb: FormBuilder, private router: Router, private authservice: AuthLocalService) {
    this.forgotpwdForm = new FormGroup({
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]))
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    this.SuccessMessage = "";
    this.ErrorMessage = "";
    if (this.forgotpwdForm.dirty && this.forgotpwdForm.valid) {
      this.authservice.forgotPassword(this.forgotpwdForm.value).subscribe((res) => {
        if (res.status == 200 && res.data.length > 0) {
          this.SuccessMessage = res.message;
          this.ErrorMessage = "";
        }
        else {
          this.SuccessMessage = "";
          this.ErrorMessage = res.message;
        }
      });
    }
    else {
      this.ErrorMessageShow = true;
    }
  }
}
