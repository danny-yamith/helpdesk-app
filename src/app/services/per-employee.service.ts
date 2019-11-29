import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'
import { baseUrl, StorageKeys } from './../helpers/constants'
import PerEmployee from '../entities/per-employee'
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class PerEmployeeService {
  public perEmployee$ = new BehaviorSubject<PerEmployee>(null)

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    this.init()
  }

  fetchPerEmployeeFromEmployeeId(employeeId: number) {
    this.http.get<PerEmployee>(
        `${baseUrl}/perEmployee/${employeeId}`
      )
      .subscribe(
        x => this.setPerEmployee(x),
        x => console.error("PerEmployeeService fetch... error", x),
        () => console.log("PerEmployeeService fetch... completed"),
      )
  }

  setPerEmployee(perEmployee: PerEmployee){
    console.log('PerEmployee: ', perEmployee)
    this.perEmployee$.next(perEmployee)
    this.storage.set(StorageKeys.PER_EMPLOYEE, perEmployee)
  }

  init(){
    this.storage.get(StorageKeys.PER_EMPLOYEE)
      .then(x => {
        console.log('PerEmployee from storage: ', x)
        this.perEmployee$.next(x)
      })
      .catch(e => {
        console.log(e)
        return this.perEmployee$.next(null)
      })
  }
}
