import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'qs-form-error-message',
  templateUrl: './form-error-message.component.html',
  styleUrls: ['./form-error-message.component.scss'],
})
export class FormErrorMessageComponent implements OnInit {

  @Input() errorMessages: ValidationMessage[];
  @Input('control') formControl: FormControl;

  constructor() { }

  ngOnInit() {}

  showErrors(validationType: string) {
    return this.formControl.hasError(validationType)
      && (this.formControl.dirty || this.formControl.touched)
  }

}

export class ValidationMessage {
  constructor(
    public type: string,
    public message: string
  ) {}
}

export type ValidationMessages = { [key: string]: ValidationMessage[] }