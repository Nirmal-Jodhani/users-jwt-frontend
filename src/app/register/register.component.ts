import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';
import { MustMatch } from '../shared/match-password.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService,
  ) {

  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      // confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      id: ['']
      // },
      // {
      //   validator: MustMatch('password', 'confirmPassword')
    });

    let userId = this.activateRoute.snapshot.paramMap.get('id');

    // redirect to home if already logged in
    if (this.authenticationService.userValue && !userId) {
      this.router.navigate(['/users']);
    }

    if (userId) {
      this.userService.getUser(userId).subscribe(
        (data) => {
          this.registerForm.patchValue(data);
        });
    }

  }

  // return controls of register form
  get registerFormControl() {
    return this.registerForm.controls;
  }

  // on submit if form is valid based on id do api call
  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (this.registerForm.value.id !== '') {
      this.userService.updateUser(this.registerForm.value).subscribe(
        (data) => { this.router.navigate(['/']); },
        (error) => { alert(error); }
      );
    } else {
      this.authenticationService.register(this.registerForm.value);
    }
  }
}
