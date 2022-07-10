import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FormControlComponent} from './components/form-control/form-control.component';
import {TruncatePipe} from './pipes/truncate.pipe';
import {EmptyValuePipe} from './pipes/empty-value.pipe';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';

const MODULES = [
  FormsModule,
  ReactiveFormsModule,
];

const PROVIDERS = [
];

const PIPES = [
  TruncatePipe,
  EmptyValuePipe
];

const COMPONENTS = [
  FormControlComponent,
  NavBarComponent,
];

const DIRECTIVES = [];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES, ...DIRECTIVES],
  imports: [CommonModule, ...MODULES, RouterModule],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  providers: [...PROVIDERS]
})
export class SharedModule {
}
