// ANGULAR
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// CONSTANT
import { CONSTANT } from '../shared/constant';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent implements OnInit {

  departments = ['Marketing', 'HR', 'Finance', 'Engineering'];
  workingTypes = ['Full time', 'Part time', 'Remote'];
  personalInformationForm: FormGroup;
  jobInformationForm: FormGroup;
  emergencyContactForm: FormGroup;

  uploadedFileList = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initiallizeAllForms();
  }

  // initialize all three forms
  initiallizeAllForms() {
    this.personalInformationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddressline1: ['', Validators.required],
      streetAddressline2: [''],
      state: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(CONSTANT.PHONENUMBER_PATTERN)])],
      homePhoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(CONSTANT.PHONENUMBER_PATTERN)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(CONSTANT.EMAIL_PATTERN)])],
      birthDate: ['', Validators.required],
      uploadFile: [''],
    });

    this.jobInformationForm = this.formBuilder.group({
      title: ['', Validators.required],
      department: ['', Validators.required],
      workingType: ['', Validators.required],
      startDate: ['', Validators.required],
    });

    this.emergencyContactForm = this.formBuilder.group({
      priContFirstName: ['', Validators.required],
      priContLastName: ['', Validators.required],
      priContPhoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(CONSTANT.PHONENUMBER_PATTERN)])],
      priContRelation: ['', Validators.required],
      secContFirstName: ['', Validators.required],
      secContLastName: ['', Validators.required],
      secContPhoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(CONSTANT.PHONENUMBER_PATTERN)])],
      secContRelation: ['', Validators.required],
    });

  }

  // return personalinformation controls
  get personalInformaionControl() {
    return this.personalInformationForm.controls;
  }

  // return jobinformation controls
  get jobInformationFormControl() {
    return this.jobInformationForm.controls;
  }

  // return jobinformation controls
  get emergencyContactFormControl() {
    return this.emergencyContactForm.controls;
  }

  // shown validatation on first step next
  personalDetailNext() {
    this.personalInformationForm.markAllAsTouched();
  }

  // shown validation on second step next
  jobInformationNext() {
    this.jobInformationForm.markAllAsTouched();
  }

  // handle the profile photo upload event
  uploadFile(event) {

    if (event.target.files && event.target.files.length) {
      let files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const obj = {
          name: files[i].name,
          size: files[i].size,
          type: files[i].type,
        };
        this.uploadedFileList.push(obj);
      }
    }
  }

  // remove file from array when deleted speicific file
  removeFile(index) {
    this.uploadedFileList.splice(index, 1);
  }

  // set validation if selected and today date difference is less than 18 year
  checkBirthDayValidation(event) {
    let difference = (new Date().getTime() - new Date(event.target.value).getTime()) / (1000 * 3600 * 24 * 6575);
    if (difference > 1) {
      return;
    } else {
      this.personalInformationForm.get('birthDate').setErrors({ birthday: true });
    }
  }

  // on submit check last form validation and api call
  submit() {
    console.log('submit', this.emergencyContactForm);
    if (this.emergencyContactForm.invalid) {
      this.emergencyContactForm.markAllAsTouched();
      return;
    }
    console.log('forms value', this.personalInformationForm.value, this.jobInformationForm.value, this.emergencyContactForm.value);
  }
}
