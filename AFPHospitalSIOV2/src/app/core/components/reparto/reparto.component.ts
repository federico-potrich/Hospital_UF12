import { Component, inject, input, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { AFPHospitalAPIService } from '../../services/afphospital-api.service';
import { Paziente } from '../../models/Paziente.model';
import { TableModule } from 'primeng/table';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { PazienteComponent } from '../paziente/paziente.component';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-reparto',
  imports: [TableModule, CascadeSelectModule, FormsModule, SelectModule, ButtonModule, RouterLink, PazienteComponent, JsonPipe],
  standalone: true,
  templateUrl: './reparto.component.html',
  styleUrl: './reparto.component.scss'
})
export class RepartoComponent implements OnInit {

  reparto_id = input<number>();

  loginService = inject(LoginService)
  api = inject(AFPHospitalAPIService);
  reparto: any;

  patient: Paziente[] = []

  pazientiProntoSoccorso = this.api.listaPz().filter(pz=>pz.id_reparto==7)

  medici: any[] = [
    {
      cognome: "Verdi",
      sesso: "M",
      specializzazione: "Cardiologia",
      reparto_id: 1
    },
    {
      cognome: "Rossi",
      sesso: "F",
      specializzazione: "Cardiologia",
      reparto_id: 2
    },
    {
      cognome: "Bianchi",
      sesso: "M",
      specializzazione: "Cardiologia",
      reparto_id: 3
    },
  ]
  mediciTurno: any[] = []


  constructor() {
    this.api.getListaPazienti()
    this.api.getListaReparti()
    this.api.getListaOspedali()
  }
  ngOnInit() {

    this.patient = this.api.listaPz().filter(pz => pz.id_reparto == this.reparto_id())
    this.mediciTurno = this.medici.filter(doc => doc.reparto_id == this.reparto_id())
    const repartoTrovato = this.api.listaRep().find(rep => rep.id_reparto === this.reparto_id());
    this.reparto = repartoTrovato?.nome;

  }

  getCountPazienti(colCode: string = 'BIANCO') {
    return this.pazientiProntoSoccorso.filter(pz => pz.codice_colore == colCode).length
  }
}
