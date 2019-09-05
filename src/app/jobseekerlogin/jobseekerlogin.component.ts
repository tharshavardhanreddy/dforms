import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ip} from '../config/url';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobseekerlogin',
  templateUrl: './jobseekerlogin.component.html',
  styleUrls: ['./jobseekerlogin.component.css']
})
export class JobseekerloginComponent implements OnInit {
  ip: string;

  constructor(private http: HttpClient, private router: Router) {
    this.ip = ip.url;
   }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    username: new FormControl('', Validators.required),
    password: new FormControl('',  Validators.required)
  });
  ngOnInit() {
  }

  onsubmit(value) {
    // const data = {
    //   username: value.username,
    //   password: value.password
    // };
    const headers = new HttpHeaders();
    headers.append('constant-type', 'application/json');
    this.http.post(this.ip + '/api/jobseekerlogin', value , { headers }).subscribe(dataa => {
      console.log(dataa);
      if (dataa.status === '200') {
        this.router.navigate(['/employeeform']);
      } else if (dataa === 'invalid' ) {
        alert('enter correct credentials');
  }
    });
}
}
