import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SignUpPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BestmatchPage } from '../pages/bestmatch/bestmatch';
import { SearchmorePage } from '../pages/searchmore/searchmore';
import {  SelectservicePage } from '../pages/selectservice/selectservice';
import { NailtechdashboardPage} from '../pages/nailtechdashboard/nailtechdashboard';
import { AvailabilityPage} from '../pages/availability/availability';
import { ProfilePage} from '../pages/profile/profile';
import { Ionic2RatingModule } from 'ionic2-rating';
import { Bookartist } from '../providers/bookartist';
import { Auth } from '../providers/auth.ts'

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SignUpPage,
    LoginPage,
    ContactPage,
    HomePage,
    TabsPage,
    BestmatchPage,
    SearchmorePage,
    SelectservicePage,
    NailtechdashboardPage,
    AvailabilityPage,
    ProfilePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SignUpPage,
    LoginPage,
    ContactPage,
    HomePage,
    TabsPage,
    BestmatchPage,
    SearchmorePage,
    SelectservicePage,
    NailtechdashboardPage,
    AvailabilityPage,
    ProfilePage
  ],
  providers: [Bookartist, {provide: ErrorHandler, useClass: IonicErrorHandler}, Auth]
})
export class AppModule {}
