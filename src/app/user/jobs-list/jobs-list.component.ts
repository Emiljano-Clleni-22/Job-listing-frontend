import {Component, OnInit, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

  user;
  jobs = [];
  jobsCopy = [];
  subject = new Subject();
  componentInView = new Subject();
  @ViewChild('searchJobInput') searchJobInput;

  constructor(
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));

      if (localStorage.getItem('jobs')) {
        const jobs = JSON.parse(localStorage.getItem('jobs'));

        if (this.user.role === 'RECRUITER') {
          this.jobs = jobs.filter(job => job.recruiter = this.user.id);
        }

        if (this.user.role === 'JOB_SEEKER') {
          this.jobs = jobs;
        }

        this.jobsCopy = this.jobs;
      }
    }

    this.subject.pipe(takeUntil(this.componentInView), debounceTime(200), distinctUntilChanged()).subscribe(response => {
      if (response) {
        this.jobs = this.jobsCopy.filter(job => job.title.indexOf(response) > -1 || job.description.indexOf(response) > -1 || job.industry.indexOf(response) > -1 || job.salary.indexOf(response) > -1);
        return;
      }

      this.jobs = this.jobsCopy;
    })
  }

  onSearchJobChange(event): void {
    this.subject.next(event.target.value);
  }

  isFavouriteJob(job): boolean {
    if (this.user && this.user.favouriteJobs && this.user.favouriteJobs.length > 0) {
      return this.user.favouriteJobs.includes(job.id);
    }

    return false;
  }

  markJobAsFavorite(job): void {
    if (this.user && !this.user.favouriteJobs) {
      this.user.favouriteJobs = [];
    }

    this.user.favouriteJobs.push(job.id);

    localStorage.setItem('user', JSON.stringify(this.user));

    this.toastService.success('Job marked as favourite');

    this.updateUsersData();
  }

  unmarkJobAsFavorite(job): void {
    const index = this.user.favouriteJobs.findIndex(favouriteJob => favouriteJob === job.id);

    if (index > -1) {
      this.user.favouriteJobs.splice(index, 1);
    }

    localStorage.setItem('user', JSON.stringify(this.user));

    this.toastService.success('Job unmarked as favourite');


    this.updateUsersData();
  }

  onDeleteClicked(index): void {
    this.jobs.splice(index , 1);

    localStorage.setItem('jobs', JSON.stringify(this.jobs));

    this.toastService.success('Job deleted successfully');
  }

  updateUsersData(): void {
    const users = JSON.parse(localStorage.getItem('users'));

    const index = users.findIndex(user => user.id === this.user.id);

    if (index > -1) {
      users[index] = this.user;
    }

    localStorage.setItem('users', JSON.stringify(users));
  }


}
