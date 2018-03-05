import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  drawerOptions: any;
  items: any[];

  constructor(public navCtrl: NavController) {
    this.drawerOptions = {
      handleHeight: 44,
      thresholdFromBottom: 50,
      thresholdFromTop: 50,
      bounceBack: true
    };

    this.items = [
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test"
    ]
  }
}