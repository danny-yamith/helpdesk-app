import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private token$ = new Subject<string>();

  constructor() { }

  getToken(): Observable<string> {
    return this.token$.asObservable();
  }

  setToken(token: string) {
    this.token$.next(token)
  }
}
