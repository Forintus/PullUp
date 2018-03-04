import { Component } from '@angular/core';

/**
 * Generated class for the ContentDrawerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'content-drawer',
  templateUrl: 'content-drawer.html'
})
export class ContentDrawerComponent {

  text: string;

  constructor() {
    console.log('Hello ContentDrawerComponent Component');
    this.text = 'Hello World';
  }

}
