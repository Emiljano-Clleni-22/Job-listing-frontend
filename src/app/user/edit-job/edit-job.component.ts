import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../services/util.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {

  user;
  jobs = [];
  form: FormGroup;
  isEditView = false;
  isViewMode = false;
  componentInView = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    if (localStorage.getItem('jobs')) {
      this.jobs = JSON.parse(localStorage.getItem('jobs'));
    }

    this.createForm();

    this.activatedRoute.params.pipe(takeUntil(this.componentInView)).subscribe(params => {
      if (params && params.id && params.id !== '0') {
        if (params.view) {
          this.isViewMode = true;
          this.form.disable();
        }

        if (!params.view) {
          this.isEditView = true;
        }

        const job = this.jobs.find(job => job.id === +params.id);

        if (job) {
          this.form.patchValue(job);
        }

        return;
      }

      this.isViewMode = false;
      this.isEditView = false;
      this.form.reset({id: this.jobs.length + 1, recruiter: this.user.id});
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      id: new FormControl(this.jobs.length + 1, [Validators.required]),
      recruiter: new FormControl(this.user.id, [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      industry: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9.]*$')]),
    });
  }

  onAddJobClicked(): void {
    if (this.form.invalid) {
      this.utilService.validateAllFormFields(this.form);
      return;
    }

    const job = this.form.value;

    if (this.jobs && this.jobs.length > 0) {
      this.jobs.push(job);
      localStorage.setItem('jobs', JSON.stringify(this.jobs));
    }

    if (this.jobs && this.jobs.length === 0) {
      localStorage.setItem('jobs', JSON.stringify([job]));
    }

    this.toastService.success('Job added successfully');

    this.router.navigate(['/user/jobs-list']).then();
  }

  onEditJobClicked(): void {
    const job = this.form.value;

    const index = this.jobs.findIndex(item => item.id === job.id);

    if (index > -1) {
      this.jobs[index] = job;
    }

    localStorage.setItem('jobs', JSON.stringify(this.jobs));

    this.toastService.success('Job updated successfully');

    this.router.navigate(['/user/jobs-list']).then();
  }

  onApplyClicked(): void {
    const job = this.form.value;

    if (this.user.appliedJobs && this.user.appliedJobs.length > 0 && this.user.appliedJobs.includes(job.id)) {
      this.toastService.error('Already Applied');
      return;
    }

    if (this.user && !this.user.appliedJobs) {
      this.user.appliedJobs = [];
    }

    this.user.appliedJobs.push(job.id);


    localStorage.setItem('user', JSON.stringify(this.user));

    this.toastService.success('Applied successfully');

    const users = JSON.parse(localStorage.getItem('users'));

    const index = users.findIndex(user => user.id === this.user.id);

    if (index > -1) {
      users[index] = this.user;
    }

    localStorage.setItem('users', JSON.stringify(users));

    this.router.navigate(['/user/jobs-list']).then();
  }

}
