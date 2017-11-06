import { Component, OnInit } from '@angular/core';
import { fadeInOutTranslate } from '../../shared/elements/animation';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";

import '../../../assets/echart/echarts-all.js';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    animations: [fadeInOutTranslate]
})
export class ProfileComponent implements OnInit {


    userImage = "assets/images/user.png";

    userData: any;
    editProfile = true;
    editProfileIcon = 'icofont-edit';

    editAbout = true;
    editAboutIcon = 'icofont-edit';

    public editor;
    public about_me;
    public editorConfig = {
        placeholder: 'About Your Self'
    };


    public data: any;
    public rowsOnPage = 10;
    public filterQuery = '';
    public sortBy = '';
    public sortOrder = 'desc';
    profitChartOption: any;

    constructor(public http: Http, private activatedRoute: ActivatedRoute, private router: Router, public parserFormatter: NgbDateParserFormatter) {

    }

    populateUserData() {

        let params: any = this.activatedRoute.snapshot.params;

        this.http.get('http://203.163.248.214:1900/user/trainee/' + params.id)
            .subscribe((data) => {



                this.data = data.json();
                this.userData = this.data.data;

                this.userData.showfirst_name = this.userData.first_name
                this.userData.showlast_name = this.userData.last_name
                this.userData.showgender = this.userData.gender
                this.userData.showaddress = this.userData.address
                this.userData.showemail = this.userData.email
                this.userData.showphone_number = this.userData.phone_number
                this.userData.showtwitter = this.userData.twitter
                this.userData.showskype = this.userData.skype
                this.userData.showabout_me = this.userData.about_me
                if (this.userData.dob)
                    this.userData.showdob = this.userData.dob;
                if (this.userData.profile_image)
                    this.userImage = 'http://203.163.248.214:1900/uploads/profile/thumbs/' + this.userData.profile_image;




            });
    }


    uploadImage(files) {

        let params: any = this.activatedRoute.snapshot.params;
        var fd = new FormData();
        fd.append('image', files[0]);
        fd.append('id', params.id);
        this.http.post("http://203.163.248.214:1900/user/image", fd).subscribe((data) => {
            let ud = data.json();
            this.userImage = 'http://203.163.248.214:1900/uploads/profile/thumbs/' + ud.data.profile_image;
            //console.log(data.json());
        });
    }



    ngOnInit() {

        if (localStorage.getItem('user')) {

            setTimeout(() => {
                this.about_me = this.about_me;
                //console.log('you can use the quill instance object to do something', this.editor);
                // this.editor.disable();
            }, 2800);

            this.populateUserData();
        }
        else
            this.router.navigateByUrl('/');

    }

    toggleEditProfile() {
        this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
        this.editProfile = !this.editProfile;
    }

    toggleEditAbout() {
        this.editAboutIcon = (this.editAboutIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
        this.editAbout = !this.editAbout;
    }

    onEditorBlured(quill) {
        console.log('editor blur!', quill);
    }

    onEditorFocused(quill) {
        console.log('editor focus!', quill);
    }

    onEditorCreated(quill) {
        this.editor = quill;
        console.log('quill is ready! this is current quill instance object', quill);
    }

    onContentChanged({ quill, html, text }) {
        console.log('quill content is changed!', quill, html, text);
    }


    saveUser() {

        // console.log(this.userData.dob);
        // if (this.userData.dob != undefined)
        //     this.userData.dob = this.userData.dob.year + "-" + this.userData.dob.month + "-" + this.userData.dob.day;
        let _me = this;
        const req = new XMLHttpRequest();
        req.open('POST', 'http://203.163.248.214:1900/user/update', true);
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        req.onload = function () {
            _me.populateUserData();
            _me.toggleEditProfile();
            //window.location.reload();
        };
        req.send(this.createDataset(this.userData));

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

    saveUserAbout() {
        let _me = this;
        const req = new XMLHttpRequest();
        req.open('POST', 'http://203.163.248.214:1900/user/aboutme', true);
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        req.onload = function () {

            _me.populateUserData();
            _me.toggleEditAbout();
        };
        req.send(this.createDataset(this.userData));
    }
}
