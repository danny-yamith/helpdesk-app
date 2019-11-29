import { PerEmployeeService } from './per-employee.service'
import LoginResponse from './../entities/login-response'
import { baseUrl, StorageKeys } from './../helpers/constants'
import LoginRequest from './../entities/login-request'
import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import md5 from 'blueimp-md5'
import Employee from '../entities/employee'
import { Storage } from '@ionic/storage'
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private loginResponse = new BehaviorSubject<LoginResponse>(null)
  private token$ = this.loginResponse.pipe(
      map(x => x && x.sessionId ? x.sessionId : null)
    )
  private employee$ = this.loginResponse.pipe(
      map(x => x && x.employee ? x.employee : null)
    )

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private perEmployeeService: PerEmployeeService,
    private navController: NavController,
  ) {
    this.storage.get(StorageKeys.SESSION)
      .then(x => {
        this.loginResponse.next(x)
      })
      .catch(e => {
        console.error(e)
        return this.loginResponse.next(null)
      })
  }

  logIn(loginRequest: LoginRequest) {
    loginRequest.pass = md5(loginRequest.pass)
      .toUpperCase()

    return this.http.post<LoginResponse>(
        `${baseUrl}/employee/login`,
         loginRequest
      )
      .pipe(
        map(x => this.setLoginResponse(x))
      )
  }

  logOut() {
    this.loginResponse.next(null)
    this.storage.clear()
    this.perEmployeeService.init()
    return this.navController.navigateRoot(['/login'], { replaceUrl: true })
  }

  getToken(): Observable<string> {
    return this.token$
  }

  getLoginResponse(): Observable<LoginResponse> {
    return this.loginResponse.asObservable()
  }

  setLoginResponse(loginResponse: LoginResponse) {
    this.storage.set(StorageKeys.SESSION, loginResponse)
    this.loginResponse.next(loginResponse)

    const employeeId = loginResponse.employee.id
    this.perEmployeeService
      .fetchPerEmployeeFromEmployeeId(employeeId)
  }

  getEmployee(): Observable<Employee> {
    return this.employee$
  }

  isLogedIn(): Observable<boolean> {
    return this.token$.pipe(
      map(x => x != null)
    )
  }
}
