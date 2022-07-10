import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastMessages = new Subject();

  constructor(
  ) {}

  error(txt, title = 'Error'): void {
    this.toastMessages.next({severity: 'error', summary: title, detail: txt,});
  }

  success(txt, title = 'Success'): void {
    this.toastMessages.next({severity: 'success', summary: title, detail: txt});
  }

  info(txt, title = 'Notification'): void {
    this.toastMessages.next({severity: 'info', summary: title, detail: txt});
  }
}
