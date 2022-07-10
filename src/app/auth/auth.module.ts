import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {AuthWrapperComponent} from "./auth-wrapper/auth-wrapper.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
  declarations: [
    AuthWrapperComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
