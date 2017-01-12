import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { LoginPage } from '../pages/login/login'
import { LoadingController, MenuController } from 'ionic-angular'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage
  loader: any

  constructor(
    public platform: Platform, 
    public loadingCtrl: LoadingController, 
    public menuCtrl: MenuController
  ) {}
}
