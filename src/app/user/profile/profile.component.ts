import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../services/util.service";
import {Router} from "@angular/router";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user;
  form: FormGroup;
  favouriteJobs = [];
  appliedJobs = [];

  constructor(
    private utilService: UtilService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.createForm();

    if (this.user) {
      this.form.patchValue(this.user);
    }

    if (localStorage.getItem('jobs')) {
      const jobs = JSON.parse(localStorage.getItem('jobs'));

      this.favouriteJobs = jobs.filter(job => this.user.favouriteJobs && this.user.favouriteJobs.length > 0 && this.user.favouriteJobs.includes(job.id));
      this.appliedJobs = jobs.filter(job => this.user.appliedJobs && this.user.appliedJobs.length > 0 && this.user.appliedJobs.includes(job.id));
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('^[0-9-+]*$')]),
    });
  }

  onSaveClicked(): void {
    if (this.form.invalid) {
      this.utilService.validateAllFormFields(this.form);
      return;
    }

    const user = {...this.user, ...this.form.value};

    localStorage.setItem('user', JSON.stringify(user));

    this.user= user;

    this.toastService.success('Profile saved successfully');

    this.router.navigate(['/user/jobs-list']).then();
  }
}
