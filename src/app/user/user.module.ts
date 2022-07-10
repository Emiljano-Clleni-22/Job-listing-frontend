import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserWrapperComponent} from './user-wrapper/user-wrapper.component';
import {JobsListComponent} from './jobs-list/jobs-list.component';
import {EditJobComponent} from './edit-job/edit-job.component';
import {RouterModule} from "@angular/router";
import {UserRoutingModule} from "./user-routing.module";
import {SharedModule} from "../shared/shared.module";
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    UserWrapperComponent,
    JobsListComponent,
    EditJobComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule {
}
