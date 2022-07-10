import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToastService} from "../../../services/toast.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  userId;
  showMobileNavbarOptions = false;
  @Input() options: { label: string, route: string }[] = [];

  constructor(
    private router: Router,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.userId = JSON.parse(localStorage.getItem('user'))._id;
    }
  }

  onLogoutClicked(option): void {
    localStorage.removeItem('user');
    this.toastService.success('Logout successfully');
    this.router.navigate([option.route]).then();
  }

}
