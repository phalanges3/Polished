
import { NgModule, ErrorHandler } from '@angular/core'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import { ChartModule } from 'angular2-chartjs'
import { MyApp } from './app.component'
import { Bookartist } from '../providers/bookartist'
import { Addreview } from '../providers/addreview'
import { ProfilePicsRevs } from '../providers/profile-pics-revs'
import { Apptcal } from '../providers/apptcal'
import { Ionic2RatingModule } from 'ionic2-rating'
import { SignUpPage } from '../pages/signup/signup'
import { LoginPage } from '../pages/login/login'
import { BestmatchPage } from '../pages/bestmatch/bestmatch'
import { SearchmorePage } from '../pages/searchmore/searchmore'
import { SelectservicePage } from '../pages/selectservice/selectservice'
import { NailtechdashboardPage} from '../pages/nailtechdashboard/nailtechdashboard'
import { AvailabilityPage} from '../pages/availability/availability'
import { ProfilePage} from '../pages/profile/profile'
import { DirectionsPage } from  '../pages/directions/directions'
import { PaymentPage  } from '../pages/payment/payment'
import { NailartistpagePage } from '../pages/nailartistpage/nailartistpage'
import { ReviewPage } from '../pages/review/review'

@NgModule({
  declarations: [
    MyApp,
    SignUpPage,
    LoginPage,
    BestmatchPage,
    SearchmorePage,
    SelectservicePage,
    NailtechdashboardPage,
    AvailabilityPage,
    ProfilePage,
    NailartistpagePage,
    PaymentPage,
    ReviewPage,
    DirectionsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule,
    ChartModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignUpPage,
    LoginPage,
    BestmatchPage,
    SearchmorePage,
    SelectservicePage,
    NailtechdashboardPage,
    AvailabilityPage,
    ProfilePage,
    PaymentPage,
    NailartistpagePage,
    ReviewPage,
    DirectionsPage
  ],
providers: [Bookartist, ProfilePicsRevs, Apptcal, Addreview, {provide: ErrorHandler, useClass: IonicErrorHandler} ]
})
export class AppModule {}
