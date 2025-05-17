import { computed, inject, Injectable, signal } from '@angular/core';
import {CreazionePaziente, Paziente} from '../models/Paziente.model';
import { HttpClient } from '@angular/common/http';
import { HttpRes } from '../models/RespManager';
import {finalize, map, retry} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AFPHospitalAPIService {

  readonly #URL = "http://localhost:3000";

  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);


  /**
   * Signal che gestisce i Pazienti
   */
  readonly #listaPz = signal<Paziente[]>([]);
  listaPz = computed(() => this.#listaPz());

  /**
   * 4 api
   *
   * - LISTA-PZ
   * - ACCETTA-PZ
   * - TRAFERISCI-PZ
   * - DIMETTI-PZ
   */

  getListaPazienti(): void{
    this.#http.get<HttpRes>(this.#URL+"/lista-pz")
    .pipe(
      retry(3),
      map((res) => JSON.parse(res.body as string) as Paziente[])
    )
    .subscribe((data) => this.#listaPz.set(data));
  }

  accettaPaziente(pz: CreazionePaziente): void{
    this.#http.post<HttpRes>(`${this.#URL}/accetta-pz`, pz)
      .pipe(
        retry(3),
        finalize(() => this.getListaPazienti())
      )
      .subscribe(data => {
        if (data.state === 'KO') console.error(data.error);
        this.#router.navigate(['/lista-pz']);
      });
  }

  traferisciPaziente(idPaziente: number): void{
    this.#http.put<HttpRes>(`${this.#URL}/trasferisci-pz/${idPaziente}`, {})
      .pipe(
        retry(3),
        finalize(() => this.getListaPazienti())
      )
      .subscribe(res => {
        if (res.state ==='KO'){
          console.error(res.error);
        }
      })
  }

  dimettiPaziente(idPaziente: number): void{
    this.#http.delete<HttpRes>(`${this.#URL}/dimetti-pz/${idPaziente}`, {})
      .pipe(
        retry(3),
        finalize(() => this.getListaPazienti())
      )
      .subscribe(res => {
        if (res.state ==='KO'){
          console.error(res.error);
        }
      })
  }
}
