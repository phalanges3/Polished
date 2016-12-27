import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BestmatchPage } from '../pages/bestmatch/bestmatch';
import { SearchmorePage } from '../pages/searchmore/searchmore';
import {  SelectservicePage } from '../pages/selectservice/selectservice';
import { NailtechdashboardPage} from '../pages/nailtechdashboard/nailtechdashboard';
import { AvailabilityPage} from '../pages/availability/availability';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BestmatchPage,
    SearchmorePage,
    SelectservicePage,
    NailtechdashboardPage,
    AvailabilityPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BestmatchPage,
    SearchmorePage,
    SelectservicePage,
    NailtechdashboardPage,
    AvailabilityPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
