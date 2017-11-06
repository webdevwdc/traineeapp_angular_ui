import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

  fullScreenRow = [];
  userRole;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private router: Router) {

    if (localStorage.getItem('user')) {
      this.fetchFilterData((data) => {
        // push our inital complete list
        this.fullScreenRow = data;
        this.userRole = JSON.parse(localStorage.getItem('user')).role;
      });
    }
    else
      this.router.navigateByUrl('/');
  }

  ngOnInit() {

  }

  fetchFilterData(cb) {

    const req = new XMLHttpRequest();
    req.open('GET', 'http://203.163.248.214:1900/user/trainee');

    req.onload = () => {
      cb(JSON.parse(req.response).data);
    };

    req.send();
  }

  edit(id: any) {
    this.router.navigateByUrl('user/profile/' + id);
  }

  delete(id: any) {
    var _me = this;
    if (confirm("Are you sure to delete " + name)) {
      const req = new XMLHttpRequest();
      req.open('POST', 'http://203.163.248.214:1900/user/delete', true);
      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      req.onload = function () {
        _me.fetchFilterData((data) => {
          _me.fullScreenRow = data;
        });
      };
      req.send('id=' + id);
    }
  }
}
