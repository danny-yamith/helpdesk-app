import { IonicStorageModule } from '@ionic/storage';
import { SessionService } from './session.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerEmployeeService } from './per-employee.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicStorageModule,
  ],
  providers: [
    SessionService,
    PerEmployeeService,
  ],
})
export class ServicesModule { }
