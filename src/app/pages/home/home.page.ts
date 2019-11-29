import { HlpSpanRequestService } from './../../services/hlp-span-request.service';
import { HlpRequestService } from './../../services/hlp-request-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Component } from '@angular/core'
import { Observable } from 'rxjs';
import PerEmployee from 'src/app/entities/per-employee';
import Employee from 'src/app/entities/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private employee$: Observable<Employee>

  constructor(
    private sessionService: SessionService,
  ) {
    this.employee$ = sessionService.getEmployee()
  }

  logOut(){
    this.sessionService.logOut().finally(
    )
  }

  ionViewWillLeave() {
    
  }
}
