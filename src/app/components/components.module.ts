import { FormErrorMessageComponent } from './form-error-message/form-error-message.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    FormErrorMessageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [
    FormErrorMessageComponent,
  ],
})
export class ComponentsModule { }
