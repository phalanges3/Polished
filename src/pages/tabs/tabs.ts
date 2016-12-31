import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { SelectservicePage } from  '../selectservice/selectservice';
import { NailtechdashboardPage } from '../nailtechdashboard/nailtechdashboard'
import { LoginPage } from '../login/login';
import { SignUpPage } from '../signup/signup';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = SignUpPage;
  tab3Root: any = LoginPage;
  tab4Root: any = SelectservicePage;
  tab5Root: any = NailtechdashboardPage;

  constructor() {

  }
}
