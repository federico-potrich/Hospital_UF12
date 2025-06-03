import { Component, inject, input, OnInit } from '@angular/core';
import { Paziente } from '../../models/Paziente.model';
import { DatePipe } from '@angular/common';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { AFPHospitalAPIService } from '../../services/afphospital-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paziente',
  imports: [DatePipe, CascadeSelectModule, FormsModule],
  templateUrl: './paziente.component.html',
  styleUrl: './paziente.component.scss'
})
export class PazienteComponent{
  pz = input.required<Paziente>()
  api = inject(AFPHospitalAPIService);

  constructor() {
    this.api.getListaReparti()
    this.api.getListaOspedali()
  }
  optionsTmp: any[] = [
      {
        nome: 'Trasferisci Reparto',
        code: 'TR',
        children: this.api.listaRep()
      },
      {
        nome: 'Trasferisci Ospedale',
        code: 'TR',
        children: this.api.listOspedali()
      },
      {
        nome: 'Dimetti',
        code: 'D'
      }
  ];

  selectedOptions : any;
  ActionPatience(){
    if(this.selectedOptions.id_reparto){
      console.log('è un reparto')
      this.api.traferisciPaziente(this.selectedOptions.id_reparto, this.pz().id_paziente)
    }else if(this.selectedOptions.id_ospedale){
      console.log('è un ospedale')
      this.api.dimettiPaziente(this.pz().id_paziente)
    }else if(this.selectedOptions.code=='D'){
      this.api.dimettiPaziente(this.pz().id_paziente)
    }
  }
  validateInput():boolean{
    if (!this.selectedOptions) return false;
    return true
  }
}
