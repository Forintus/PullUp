import { Component, Input, ElementRef, Renderer, ViewChild } from '@angular/core';
import { Platform, DomController, Searchbar } from 'ionic-angular';
import { FormControl } from '@angular/forms';

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
export class ContentDrawer {

  @Input('options') options: any;

  @ViewChild(Searchbar) searchBar: Searchbar;

  private handleHeight: number = 44;
  private bounceBack: boolean = true;
  private thresholdTop: number = 50;
  private thresholdBottom: number = 50;
  private drawerTop: number = 70;
  private panVelocity: number = 0.5;
  private panAnimation: number = 0.3;
  private drawerBottom: number = this.platform.height() - this.handleHeight - 100;
  private initialTop: number = this.drawerBottom;

  private searchControl: FormControl;
  private shouldShowCancel: boolean = true;
  private placeholder: string = 'Zoek een locatie';
  private cancelButtonText = "Annuleren";
  private searching: boolean = false;

  constructor(public element: ElementRef, public renderer: Renderer, public domCtrl: DomController,
    public platform: Platform) {

    console.log('Constructing ContentDrawer Component');

    this.searchControl = new FormControl();
  }

  onFocus(event) {
    this.animateDrawer(this.drawerTop);
  }

  onBlur(event) {

  }

  onSearchInput() {
    this.searching = true;
  }

  onClearSearch(event) {
    // this.items = [];
    // this.items.length = 0;
  }

  onCancelSearch(event) {
    this.animateDrawer(this.drawerBottom);
  }

  ngAfterViewInit() {

    if (this.options.handleHeight) {
      this.handleHeight = this.options.handleHeight;
    }

    if (this.options.bounceBack) {
      this.bounceBack = this.options.bounceBack;
    }

    if (this.options.thresholdFromBottom) {
      this.thresholdBottom = this.options.thresholdFromBottom;
    }

    if (this.options.thresholdFromTop) {
      this.thresholdTop = this.options.thresholdFromTop;
    }

    this.renderer.setElementStyle(this.element.nativeElement, 'top', this.initialTop + 'px');

    // Let the toolbar be the draggable part
    let hammer = new window['Hammer'](this.element.nativeElement.children[0]);
    // let hammer = new window['Hammer'](this.element.nativeElement);
    hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_VERTICAL, threshold: 0 });

    hammer.on('pan', (ev) => {
      this.handlePan(ev);
    })
  }

  handlePan(ev) {

    let delta = ev.deltaY,
    time = ev.deltaTime,
    speed = delta / time || 0;

    // console.log(speed);

    let newTop = this.initialTop + delta;

    let bounceToBottom = false,
    bounceToTop = false;

    this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'none');

    // When not at top or bottom
    if (newTop > this.drawerTop && newTop < this.drawerBottom) {
      // When in motion
      if (ev.additionalEvent === "panup" || ev.additionalEvent === "pandown") {
        this.domCtrl.write(() => {
          this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
        });
      }
    }

    if (ev.isFinal) {
      if (this.bounceBack) {

        let topDiff = newTop - this.thresholdTop;
        let bottomDiff = (this.platform.height() - this.thresholdBottom) - newTop;

        topDiff >= bottomDiff ? bounceToBottom = true : bounceToTop = true;

        console.log("bounceToBottom", bounceToBottom);
        console.log("bounceToTop", bounceToTop);
      }

      if (speed < -this.panVelocity) {
        this.animateDrawer(this.drawerTop);
      } else if (speed > this.panVelocity) {
        this.animateDrawer(this.drawerBottom);
      } else if (newTop < this.thresholdTop || bounceToTop) {
        this.animateDrawer(this.drawerTop);
      } else if ((this.platform.height() - newTop) < this.thresholdBottom || bounceToBottom) {
        this.animateDrawer(this.drawerBottom);
      }
    }
  }

  animateDrawer(edge: number) {
    this.domCtrl.write(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'top ' + this.panAnimation + 's');
      this.renderer.setElementStyle(this.element.nativeElement, 'top', edge + 'px');
    });
    this.initialTop = edge;
  }
}