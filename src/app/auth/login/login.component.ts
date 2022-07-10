import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../services/util.service";
import {ToastService} from "../../services/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onLoginClicked(): void {
    if (this.form.invalid) {
      this.utilService.validateAllFormFields(this.form);
      return;
    }

    let users = [];

    if (localStorage.getItem('users')) {
      users = JSON.parse(localStorage.getItem('users'));

      const user = users.find(user => user.email === this.form.get('email').value)

      if (!user) {
        this.toastService.error('User not found');
        return;
      }

      if (user && user.password !== this.form.get('password').value) {
        this.toastService.error('Password does not match');
        return;
      }

      localStorage.setItem('user', JSON.stringify(user));
    }

    this.toastService.success('Login successfully');
    this.router.navigate(['/user/jobs-list']).then();

  }
}
