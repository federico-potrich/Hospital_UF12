import {Component, computed, inject, signal} from '@angular/core';
import {CodiceColore, CreazionePaziente, StatoPZ} from '../../core/models/Paziente.model';
import {FormsModule} from '@angular/forms';
import {AFPHospitalAPIService} from '../../core/services/afphospital-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accetta-pz',
  imports: [
    FormsModule
  ],
  templateUrl: './accetta-pz.component.html',
  styleUrl: './accetta-pz.component.scss'
})
export class AccettaPzComponent {
  readonly #AFPHospitalAPI = inject(AFPHospitalAPIService);

  /**
   * -- ANAGRAFICA
   * - nome
   * - cognome
   * - data di nascita ???
   * - codice fiscale
   *
   * -- PZ
   * - codice colore
   * - codie pz
   * - stato
   */

  readonly nome = signal<string>('');
  readonly cognome = signal<string>('');
  readonly dataNascita = signal<string>('');
  readonly dataNascitaParse = computed(() =>
    this.dataNascita() ? new Date(this.dataNascita()) : new Date('1970-01-01')
  )
  readonly codiceFiscale = signal<string>('');
  readonly codiceColore = signal<CodiceColore>('NON FORNITO');
  readonly fase = signal<Fase>('TRIAGE');
  readonly note = signal<string>('');

  calcolaCodicePZ(): string{
    let dataAttuale = new Date()
    const yyyy = dataAttuale.getFullYear();
    const dd = String(dataAttuale.getDate()).padStart(2, '0');
    const mm = String(dataAttuale.getMonth() + 1).padStart(2, '0'); // Mese da 0 a 11
    return this.nome().charAt(0) +
      this.cognome().charAt(0) +
      this.dataNascitaParse().getFullYear()+
      "_"+dd+mm+yyyy

  }

  accettaPaziente(): void{
    let pzTmp: CreazionePaziente = {
      nome: this.nome(),
      cognome: this.cognome(),
      dataNascita: this.dataNascitaParse(),
      codiceFiscale: this.codiceFiscale(),
      codiceColore: this.codiceColore(),
      stato: 'IN CARICO',
      codice: this.calcolaCodicePZ()
    }

    this.#AFPHospitalAPI.accettaPaziente(pzTmp);
    inject(Router).navigate([''])
  }

  /**
   * true -> DATI OK
   * false --> dati ko
   */
  validateInput(): boolean{
    if (!this.nome()) return false;
    if (!this.cognome()) return false;
    if (
      !this.codiceFiscale() ||
      this.codiceFiscale().length !== 16
    ) return false;
    if (this.codiceColore() === 'NON FORNITO') return false;
    if (!this.dataNascitaParse()) return false;


    return true;
  }

}
export type Fase  = 'TRIAGE' | 'ANAMNESI' | 'DIARIO CLINICO' | 'DIMISSIONE'
