import { SessionService } from './session.service'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { merge } from 'rxjs'
import { flatMap, take } from 'rxjs/operators'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public SessionService: SessionService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const addAuthorizationHeaderIfTokenExist: (value: string, index: number) => Observable<HttpEvent<any>> = x => {
      console.log('x: ', x)
      if (x) {
        console.log('token: ', x)
        req = req.clone({
          setHeaders: {
            Authorization: `${x}`
          }
        })
      } else {
        console.log('token does not exist!')
      }
      return next.handle(req)
    }

    return this.SessionService.getToken().pipe(
      take(1),
      flatMap(addAuthorizationHeaderIfTokenExist),
    )
  }
}
