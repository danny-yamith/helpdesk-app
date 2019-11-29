import { HlpSpanRequestService } from './../../../services/hlp-span-request.service';
import { PerEmployeeService } from './../../../services/per-employee.service';
import { HlpRequestService } from './../../../services/hlp-request-service.service';
import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { of, pipe, combineLatest } from 'rxjs'
import { flatMap, reduce, take, map, delay } from 'rxjs/operators';
import OpenedRequestSpan from 'src/app/entities/opened-request-span'
import ClosedSpansRequest from 'src/app/entities/closed-spans-request';
import { IonRefresher, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  openTasks$: Observable<OpenedRequestSpan[]>
  closedTasks$: Observable<ClosedSpansRequest[]>
  showProgress = false
  workingSpanId: number = 0;
  workingRequestId: number = 0;

  @ViewChild(IonRefresher , {static: false}) refresher: IonRefresher

  constructor(
    private hlpRequestService: HlpRequestService,
    private perEmployeeService: PerEmployeeService,
    private hlpSpanRequestService: HlpSpanRequestService,
    private alertController: AlertController,
  ) {
    this.loadData()
  }

  ngOnInit() {
  }

  close(spanId: number) {
    if(this.workingSpanId == 0){
      console.log('close: ', spanId)
      this.workingSpanId = spanId
      this.hlpRequestService.closeSpan(spanId)
      .pipe(
        delay(1000)
      )
      .subscribe(
        _x => this.workingSpanId = 0,
        e => {
            this.workingSpanId = 0
          if(e.error) 
            this.showAlert(e.error)
        },
        () => this.loadData(),
      )
    }
  }

  open(requestId: number) {
    if(this.workingRequestId == 0){
      console.log('open: ', requestId);
      this.workingRequestId = requestId
      this.hlpRequestService.reopenRequest(requestId).pipe(
        delay(1000)
      )
      .subscribe(
        _x => this.workingRequestId = 0,
        e => {
            this.workingRequestId = 0
          if(e.error) 
            this.showAlert(e.error)
        },
        () => this.loadData(),
      )
    }
  }

  toggleProgress(){
    this.showProgress = !this.showProgress
  }

  loadData(){
    console.log('loadData')
    if(this.refresher)
      this.refresher.disabled = false

    const perEmployee$ = this.perEmployeeService.perEmployee$

    this.closedTasks$ = perEmployee$.pipe(
      flatMap(x => x
        ? this.hlpRequestService.fetchEmployeeClosedSpansRequests(x.empId)
        : of(null)
      ),
    )

    this.openTasks$ = perEmployee$.pipe(
      flatMap( x => x
        ? this.hlpSpanRequestService.fetchEmployeeOpenedRequestSpans(x.empId)
        : of(null)
      ),
    )

    combineLatest(this.closedTasks$, this.openTasks$)
    .subscribe(_x => {
        setTimeout(() => {
          this.refresher.complete()
        }, 1000);
      }
    )
  }

  async showAlert(message: string){
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Cerrar']
    });

    await alert.present();
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave')
    this.openTasks$ = null 
    this.closedTasks$ = null 
  }
}