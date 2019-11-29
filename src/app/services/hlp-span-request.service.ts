import { baseUrl } from './../helpers/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import OpenRequestSpan from '../entities/opened-request-span';
import { stringToDate } from 'src/app/helpers/date'
import { map } from 'rxjs/operators'
import moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class HlpSpanRequestService {

  constructor(
    private http: HttpClient,
  ) { }

  fetchEmployeeOpenedRequestSpans(employeeId: number){
    return this.http.get<OpenRequestSpan[]>(
        `${baseUrl}/hlpSpanRequest/perEmployee/${employeeId}`
      ).pipe(
        map(x => x.map(reifyDate))
      )
  }
}

function reifyDate(value: OpenRequestSpan): OpenRequestSpan {
  value.spanRegistrationDate = stringToDate(value.spanRegistrationDate)
  return value
}