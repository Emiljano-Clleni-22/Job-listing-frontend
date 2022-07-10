import { Component, OnInit } from '@angular/core';
import {ANIMATIONS} from "../../config/animations";

@Component({
  selector: 'app-user-wrapper',
  templateUrl: './user-wrapper.component.html',
  styleUrls: ['./user-wrapper.component.scss'],
  animations: ANIMATIONS.routesAnimation
})
export class UserWrapperComponent implements OnInit {

  navbarOptions = [
    {label: 'Jobs', route: '/user/jobs-list'},
    {label: 'Add Job', route: '/user/edit-job/0'},
    {label: 'Profile', route: '/user/profile'},
    {label: 'Logout', route: '/auth/login'},
  ]

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));

      if (user && user.role === 'RECRUITER') {
        this.navbarOptions.splice(2, 1);
      }

      if (user && user.role === 'JOB_SEEKER') {
        this.navbarOptions.splice(1, 1);
      }
    }

  }

}
