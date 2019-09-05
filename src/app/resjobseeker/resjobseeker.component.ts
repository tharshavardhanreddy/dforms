import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ip} from '../config/url';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resjobseeker',
  templateUrl: './resjobseeker.component.html',
  styleUrls: ['./resjobseeker.component.css']
})
export class ResjobseekerComponent implements OnInit {
  ip: string;

  constructor(private http: HttpClient, private router: Router) {
    this.ip = ip.url;
   }

   form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('',  Validators.required),
    mobilenumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    dob: new FormControl('')

   });

  ngOnInit() {
  }

  onsubmit(value) {

    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    this.http.post(this.ip + '/api/resjobseek', value, { headers }).subscribe(response => {
      console.log(response);
      if (response === 'inserted') {
        this.router.navigate(['/jobseeker']);
      } else {
        alert('invalid details');
      }
    });
  }

}
