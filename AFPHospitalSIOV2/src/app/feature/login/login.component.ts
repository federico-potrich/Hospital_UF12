import { gsap } from 'gsap';
import { AfterViewInit, Component, computed, inject, signal } from '@angular/core';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
gsap.registerPlugin(DrawSVGPlugin);

import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

import { FormsModule } from '@angular/forms';
import { LoginService } from '../../core/services/login/login.service';
import { Router } from '@angular/router';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  imports: [IconFieldModule, InputIconModule, FormsModule, PasswordModule, ButtonModule, InputGroupModule, InputGroupAddonModule, Toast, MessageModule ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {
  #messageService = inject(MessageService)
  #service = inject(LoginService)
  visible = signal<boolean>(false);

  credentials: any = {
    username: "",
    password: ""
  }
  constructor(private messageService: MessageService) {
    if (this.#service.logged()) {
      inject(Router).navigate([''])
    }
  }

  login() {
    if(this.#service.login(this.credentials.username, this.credentials.password)==false){
      this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Your email or password is incorrect.\n\rPlease try again.' , sticky: true });
      this.visible.set(true);
    }
  }

  ngAfterViewInit(): void {

    //animazioni delle bolle
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
    // animazione linea heart beat
    gsap.from(".draw-me", {
      duration: 10,
      drawSVG: 0,
      repeat: -1,
      ease: 'power1.inOut'
    });
  }
}
