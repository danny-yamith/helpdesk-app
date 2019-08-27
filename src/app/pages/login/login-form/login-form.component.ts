import { SessionService } from './../../../services/session.service';
import { ValidationMessages } from './../../../components/form-error-message/form-error-message.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'qs-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    username: [ '', {
      validators: [Validators.required, Validators.minLength(3),] ,
    }],
    password: [ '', {
      validators: [ Validators.required ],
      // updateOn: 'blur',
    }],
  });

  validationMessages: ValidationMessages = {
    'username': [
      { type: 'required', message: 'El nombre de usuario es obligatorio' },
      { type: 'minlength', message: 'El nombre de usuario debe tener minimo 3 caracteres' },
    ],
    'password': [
      { type: 'required', message: 'La contraseña es obligatoria' },
    ],
  };

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {}

  logIn() {
    if(this.loginForm.valid) {
      console.log('form is valid');
    } else {
      console.error('form is invalid');
    }
  }
}
