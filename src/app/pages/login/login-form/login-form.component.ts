import { AlertController } from '@ionic/angular';
import LoginRequest from './../../../entities/login-request'
import { SessionService } from 'src/app/services/session.service'
import { ValidationMessages } from './../../../components/form-error-message/form-error-message.component'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { Alert } from 'selenium-webdriver';

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
  })

  validationMessages: ValidationMessages = {
    'username': [
      { type: 'required', message: 'El nombre de usuario es obligatorio' },
      { type: 'minlength', message: 'El nombre de usuario debe tener minimo 3 caracteres' },
    ],
    'password': [
      { type: 'required', message: 'La contraseña es obligatoria' },
    ],
  }

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {}

  logIn() {
    console.log('LogIn Method')
    if(this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        login: this.loginForm.get('username').value as string,
        pass: this.loginForm.get('password').value as string,
        // poolName: 'qualisysds',
        poolName: 'sigmads',
        type: 'web',
        tz: 'GMT-05:00'
      }

      this.sessionService.logIn(loginRequest)
      .subscribe(x => console.log('logged in'),
        e => {
          if(e.error) 
            this.showAlert(e.error)
        },
      )
    }
  }

  async showAlert(message: string){
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Cerrar']
    });

    await alert.present();
  }
}
