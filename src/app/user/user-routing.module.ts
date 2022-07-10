import {RouterModule, Routes} from "@angular/router";
import {UserWrapperComponent} from "./user-wrapper/user-wrapper.component";
import {NgModule} from "@angular/core";
import {JobsListComponent} from "./jobs-list/jobs-list.component";
import {EditJobComponent} from "./edit-job/edit-job.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {
    path: '',
    component: UserWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'jobs-list',
        pathMatch: 'full'
      },
      {
        path: 'jobs-list',
        component: JobsListComponent,
      },
      {
        path: 'edit-job/:id',
        component: EditJobComponent,
      },
      {
        path: 'edit-job/:id/:view',
        component: EditJobComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {

}
