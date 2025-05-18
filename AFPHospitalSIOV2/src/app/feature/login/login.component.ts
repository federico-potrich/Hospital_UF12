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
    gsap.from(".draw-me", {
      duration: 10,
      drawSVG: 0,
      repeat: -1,
      ease: 'power1.inOut'
    });
  }
}
