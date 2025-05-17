import { Component } from '@angular/core';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [IconFieldModule, InputIconModule, FormsModule, PasswordModule, ButtonModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials: any = {
    username:"",
    password:""
  }
}
