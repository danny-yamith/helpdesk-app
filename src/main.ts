import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

import moment from 'moment'

if (environment.production) {
  enableProdMode()
}

moment.locale('es')
moment.defaultFormat = `YYYY-MM-DDTHH:mm:ss.SSSZ`

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err))
