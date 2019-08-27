import { ComponentsModule } from './../../components/components.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LoginPage,
    LoginFormComponent,
  ]
})
export class LoginPageModule {}
