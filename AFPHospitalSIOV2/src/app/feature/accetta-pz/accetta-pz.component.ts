import {Component, computed, inject, signal} from '@angular/core';
import {CodiceColore, CreazionePaziente, StatoPZ} from '../../core/models/Paziente.model';
import {FormsModule} from '@angular/forms';
import {AFPHospitalAPIService} from '../../core/services/afphospital-api.service';

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

  calcolaCodicePZ(): string{
    return this.nome().charAt(0) +
      this.cognome().charAt(0) +
      this.dataNascitaParse().getFullYear()
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
