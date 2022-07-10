import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../services/util.service";
import {Router} from "@angular/router";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  constructor(
    private utilService: UtilService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      id: new FormControl('0', [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('^[0-9-+]*$')]),
      role: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),

    });
  }

  onSignupClicked(): void {
    if (this.form.invalid) {
      this.utilService.validateAllFormFields(this.form);
      return;
    }

    if (this.form.get('password').value !== this.form.get('confirmPassword').value) {
      this.toastService.error('Password does not match.');
      return;
    }

    let users = [];

    if (localStorage.getItem('users')) {
      users = JSON.parse(localStorage.getItem('users'));

      if (users.find(user => user.email === this.form.get('email').value)) {
        this.toastService.error('User already exists with provided email');
        return;
      }

      this.form.get('id').setValue(users.length + 1);
    }

    const user = {
      ...this.form.value,
    }

    delete user.confirmPassword;

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));

    this.toastService.success('Signup successfully');
    this.router.navigate(['./auth/login']).then();
  }
}
