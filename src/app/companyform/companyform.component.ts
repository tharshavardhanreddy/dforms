import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ip} from '../config/url';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-companyform',
  templateUrl: './companyform.component.html',
  styleUrls: ['./companyform.component.css']
})
export class CompanyformComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  ip: string;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  skills: string[] = [];
  allSkills: string[] = ['Html', 'java', 'javascript', 'angular', 'blockchain', 'sap', 'css', 'sql', 'nosql',
    'mongoDB', 'nodejs', 'react', 'express', 'abap', 'spring', 'hibernate', 'dbms', 'peoplesoft', 'networking'];

  @ViewChild('skillInput', { static: false }) skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  constructor(private http: HttpClient) {
    this.ip = ip.url;
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
  }
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    cname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    mobilenumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    ctc: new FormControl(''),
    aname: new FormControl('', Validators.required),
    location: new FormControl(''),
    years: new FormControl('', Validators.required),
    designation: new FormControl(''),
    position: new FormControl('2'),
    vacancy: new FormControl(''),
    skills: new FormControl([], Validators.required),
    months: new FormControl('', Validators.required)
  });

  // skill = [
  //   { id: 1, value: 'HTML' },
  //   { id: 2, value: 'SAP' },
  //   { id: 3, value: 'JAVA' },
  //   { id: 4, value: 'BLOCKCHAIN' },
  //   { id: 5, value: 'PYTHON' },
  //   { id: 6, value: 'CSS' },
  //   { id: 7, value: 'ANGULAR' },
  //   { id: 8, value: 'REACT' },
  //   { id: 9, value: 'JAVASCRIPT' },
  //   { id: 10, value: 'NODEJS' },
  //   { id: 11, value: 'MONOGO DB' }
  // ];

  year = [
    { id: 1, value: '1' },
    { id: 2, value: '2' },
    { id: 3, value: '3' },
    { id: 4, value: '4' },
    { id: 5, value: '5' },
    { id: 6, value: '6' },
    { id: 7, value: '7' },
    { id: 8, value: '8' },
    { id: 9, value: '9' },
    { id: 10, value: '10' },
    { id: 11, value: '11' },
    { id: 12, value: '12' },
    { id: 13, value: '13' },
    { id: 14, value: '14' },
    { id: 15, value: '15' },
    { id: 16, value: '16' },
    { id: 17, value: '17' },
    { id: 18, value: '18' },
    { id: 19, value: '19' },
    { id: 20, value: '20' }
  ];

  month = [
    { id: 1, value: '1' },
    { id: 2, value: '2' },
    { id: 3, value: '3' },
    { id: 4, value: '4' },
    { id: 5, value: '5' },
    { id: 6, value: '6' },
    { id: 7, value: '7' },
    { id: 8, value: '8' },
    { id: 9, value: '9' },
    { id: 10, value: '10' },
    { id: 11, value: '11' },
    { id: 12, value: '12' },
  ];

  ectc = [
    { id: 1, value: '1' },
    { id: 2, value: '2' },
    { id: 3, value: '2.5' },
    { id: 4, value: '3' },
    { id: 5, value: '3.5' },
    { id: 6, value: '4' },
    { id: 7, value: '4.5' },
    { id: 8, value: '5' },
    { id: 9, value: '5.5' },
    { id: 10, value: '6' }
  ];

  ngOnInit() {
  }
  add(event: MatChipInputEvent): void {
    // Add skill only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our skill
      if ((value || '').trim()) {
        this.skills.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.skillCtrl.setValue(null);
    }
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
  }


  onsubmit(value) {
    const data = {
      companyname: value.cname,
      email: value.email,
      mobilenumber: value.mobilenumber,
      authorisedname: value.aname,
      ctc: value.ctc,
      location: value.location,
      designation: value.designation,
      vacancy: value.vacancy,
      position: value.position,
      experienceinyears: value.years,
      experienceinmonths: value.months,
      skillsknown: this.skills
    };
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    this.http.post(this.ip + '/api/companyjob', data, {headers} ).subscribe(response => {
    console.log(response);
    });
  }
}
