import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { BestmatchPage } from '../bestmatch/bestmatch';
import { SelectservicePage } from  '../selectservice/selectservice'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tab4Root: any = BestmatchPage;
  tab5Root: any = SelectservicePage;
  constructor() {

  }
}
