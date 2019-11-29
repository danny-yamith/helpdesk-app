import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SessionService } from 'src/app/services/session.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  subscription: Subscription

  constructor(
    private SessionService: SessionService,
    private platform: Platform,
    private splash: SplashScreen,
    private router: Router
  ) { }

  ngOnInit() {
    this.redirectIfLoggedIn()
  }

  redirectIfLoggedIn() {
    this.platform.ready().then(() => {
      this.subscription = this.SessionService.isLogedIn().subscribe(x => {
        if(x) {
          this.router.navigate(['/home'], { replaceUrl: true })
            .then(() => this.splash.hide())
        } else {
          setTimeout(() => this.splash.hide(), 1000)
        }
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
