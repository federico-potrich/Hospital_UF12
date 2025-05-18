import { gsap } from 'gsap';
import { AfterViewInit, Component } from '@angular/core';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
gsap.registerPlugin(DrawSVGPlugin);

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [IconFieldModule, InputIconModule, FormsModule, PasswordModule, ButtonModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit{
  credentials: any = {
    username: "",
    password: ""
  }
  constructor() {

  }
  ngAfterViewInit(): void {
    const bubbles = document.querySelectorAll('.bubble');

    bubbles.forEach((bubble, i) => {
      gsap.to(bubble, {
        duration: 3 + Math.random() * 2, // tra 3 e 5 secondi
        x: '+=20',
        y: '+=15',
        rotation: '+=10',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2, // per desincronizzarle
      });
    });
    gsap.from(".draw-me", {
      duration: 10,
      drawSVG: 0,
      repeat: -1,
      ease: 'power1.inOut'
    });
  }
}
