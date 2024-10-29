import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {  ElementRef, ViewChild } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard, IonCardContent } from '@ionic/angular';



@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  @ViewChild('image', { read: ElementRef }) image: ElementRef<HTMLIonCardElement>;

  private animation: Animation;

  constructor(private navCtrl: NavController, private animationCtrl : AnimationController) { }
  ngOnInit() {
    
    setTimeout(()=>{
      this.navCtrl.navigateForward(['/login'])
    },3000)
  }
  
  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.image.nativeElement)
      .duration(2000)
      .delay(1000)
      .beforeClearStyles(['box-shadow'])
      .afterClearStyles(['filter'])
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.5, transform: 'scale(1.5)' },
        { offset: 1, transform: 'scale(1)' },
      ]);
      this.animation.play();
  }
}
