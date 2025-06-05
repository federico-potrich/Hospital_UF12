import { computed, inject, Injectable, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getApp, initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  #router = inject(Router);
  #isLogged = signal<boolean>(false);
  #auth = inject(Auth);
  readonly logged = computed(() => this.#isLogged());

  #fakeUsers = [
    { username: 'admin', password: 'admin123', reparto_id: 7},
    { username: 'user1', password: 'pass1' , reparto_id: 2},
    { username: 'demo', password: 'demo123' , reparto_id: 7}
  ];

  constructor() {

    const lastSession = localStorage.getItem('LAST_SESSION');
    const today = this.#formatDate(new Date());


    if (lastSession === today && (lastSession != null  && localStorage.getItem('USER') != null) ) {
      this.#isLogged.set(true);
    } else {
      this.#isLogged.set(false);
      localStorage.removeItem('LAST_SESSION');
      localStorage.removeItem('USER');
    }
  }

  login(username: string, password: string): boolean {
    const user = this.#fakeUsers.find(u => u.username === username && u.password === password);

    if (user) {
      this.#isLogged.set(true);

      const now = new Date();
      const formattedDate = this.#formatDate(now);

      localStorage.setItem('LAST_SESSION', formattedDate);
      localStorage.setItem('USER', user.username);

      this.#router.navigate(['']);
      return true;
    } else {
      this.#isLogged.set(false);
      return false;
    }
  }
  async loginEmail(
        email: string,
        password: string
      ): Promise<boolean> {
        const auth = getAuth(getApp());
        return signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Login riuscito
            const user = userCredential.user;
            console.log(user)
            return true;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            return false;
          });
      }

  // FUNZIONE CHE RESTITUISCE LA DATA DI OGGI con formato dd/MM/yyyy
  #formatDate(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}/${
      (date.getMonth() + 1).toString().padStart(2, '0')
    }/${date.getFullYear()}`;
  }
  getData(){

    const lastSession = localStorage.getItem('LAST_SESSION');
    const today = this.#formatDate(new Date());

    if (lastSession === today && (lastSession != null  && localStorage.getItem('USER') != null) ) {
      let user = this.#fakeUsers.filter(el=>el.username==localStorage.getItem('USER'))[0]

      // console.log(user)
      return user;
    }
    return null
  }
}
