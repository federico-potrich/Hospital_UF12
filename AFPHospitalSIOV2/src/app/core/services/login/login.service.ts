import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  #isLogged = signal<boolean>(false);
  readonly logged = computed(()=>this.#isLogged());
  constructor() { }
  login(){
    this.#isLogged.set(!this.#isLogged)
  }
}
