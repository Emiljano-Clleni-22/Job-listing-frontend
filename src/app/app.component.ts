import {Component, OnInit} from '@angular/core';
import {ToastService} from "./services/toast.service";
import {Subject, takeUntil} from "rxjs";
import users from '../jsons/users.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  toastMessages = [];
  title = 'job-listing-frontend';
  componentInView = new Subject();

  constructor(private toastService: ToastService) {
  }

  ngOnInit() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(users.users));
    }

    this.toastService.toastMessages.pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.toastMessages.push(response);

      if (this.toastMessages && this.toastMessages.length > 0) {
        this.toastMessages.forEach((message, index) => {
          setTimeout(() => {
            this.toastMessages.splice(index, 1)
          }, 2500);
        });
      }
    });
  }
}
