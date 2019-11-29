import { baseUrl } from './../helpers/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import ClosedSpansRequest from '../entities/closed-spans-request';
import moment from 'moment';
import { stringToDate } from 'src/app/helpers/date'

@Injectable({
  providedIn: 'root'
})
export class HlpRequestService {
  constructor(
    private http: HttpClient,
  ) { }

  fetchEmployeeClosedSpansRequests(employeeId: number){
    return this.http.get<ClosedSpansRequest[]>(
      `${baseUrl}/hlpRequest/perEmployee/${employeeId}`
      ).pipe(
        map(x => x.map(reifyDate))
      )
  }

  closeSpan(spanId: number) {
    return this.http.put(`${baseUrl}/hlpRequest/closeSpan/${spanId}`, null)
  }

  reopenRequest(requestId: number){
    return this.http.put(`${baseUrl}/hlpRequest/${requestId}/openSpan`, null)
  }
}

function reifyDate(value: ClosedSpansRequest): ClosedSpansRequest {
  value.requestRegistrationDate = stringToDate(value.requestRegistrationDate);
  return value
}