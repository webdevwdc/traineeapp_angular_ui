import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare const $: any;
declare var Morris: any;

@Component({
  selector: 'app-dashboard-default',
  templateUrl: './dashboard-default.component.html',
  styleUrls: ['./dashboard-default.component.css']
})
export class DashboardDefaultComponent implements OnInit {

  userdata = {};
  rolewiseUserData = {};
  constructor(private router: Router) { }

  ngOnInit() {

    if (localStorage.getItem('user')) {
      this.rolewiseUserData = JSON.parse(localStorage.getItem('user'));

      const req = new XMLHttpRequest();
      req.open('GET', 'http://203.163.248.214:1900/user/dashboard');

      req.onload = () => {
        this.userdata = JSON.parse(req.response).data;
      };

      req.send();
    }
    else {
      this.router.navigate(['/']);
    }
  }

}
