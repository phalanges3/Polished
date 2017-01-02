import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar, Splashscreen } from 'ionic-native'
import { LoginPage } from '../pages/login/login'
import { Auth } from '../providers/auth'
import { TabsPage } from '../pages/tabs/tabs'
import { LoadingController } from 'ionic-angular'



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage
  loader: any

  constructor(public auth: Auth, public loadingCtrl: LoadingController) {
    this.presentLoading()
    this.auth
      .login()
      .then((isLoggedIn) => {
        if (isLoggedIn) {
          this.rootPage = TabsPage
        }
        else {
          this.rootPage = LoginPage
        }
         this.loader.dismiss()
      })
    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   StatusBar.styleDefault();
    //   Splashscreen.hide();
    // });
   
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Logging into your account..."
      
    });
    this.loader.present();
  }
}
