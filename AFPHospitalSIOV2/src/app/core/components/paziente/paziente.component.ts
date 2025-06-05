import { Component, computed, inject, input, OnInit } from '@angular/core';
import { Paziente } from '../../models/Paziente.model';
import { DatePipe } from '@angular/common';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { AFPHospitalAPIService } from '../../services/afphospital-api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-paziente',
  imports: [DatePipe, CascadeSelectModule, FormsModule],
  templateUrl: './paziente.component.html',
  styleUrl: './paziente.component.scss'
})
export class PazienteComponent{
  pz = input.required<any>()

  api = inject(AFPHospitalAPIService);

  pzComp = computed(()=>this.pz())

  #router = inject(Router);

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
      this.api.traferisciPaziente(this.selectedOptions.id_reparto, this.pz().id_paziente)
    }else if(this.selectedOptions.id_ospedale){
      this.api.dimettiPaziente(this.pz().id_paziente)
    }else if(this.selectedOptions.code=='D'){

      if(this.api.listStoria().length !== 0){
        this.generate()
      }
    }

    this.#router.navigate(['']);
  }
  generate(){
    const doc = new jsPDF();

    // Titolo
    doc.setFontSize(16);
    doc.text('Referto Clinico Paziente', 105, 20, { align: 'center' });

    let imgApss = new Image(50, 15)
    imgApss.src='APSSlogo.png'
    doc.addImage(imgApss, '', 10, 10, 50, 15)
    // Dati Anagrafici
    doc.setFontSize(12);
    doc.text(`Nome: ${this.pz().nome}`, 20, 40);
    doc.text(`Cognome: ${this.pz().cognome}`, 20, 50);
    doc.text(`Data di nascita: ${this.pz().data_nascita}`, 20, 60);
    doc.text(`Codice fiscale: ${this.pz().codice_fiscale}`, 20, 70);

    // Info Paziente
    doc.text(`Codice Paziente: ${this.pz().codice}`, 20, 90);
    doc.text(`Codice Colore: ${this.pz().codice_colore}`, 20, 100);
    doc.text(`Stato: ${this.pz().stato}`, 20, 110);
    doc.text(`Reparto: ${this.api.listaRep().filter(rep=>rep)[0].nome}`, 20, 120);

    // Cartelle cliniche (se presenti)
    if (this.pz().cartelleCliniche?.length > 0) {
      doc.text('Cartelle Cliniche:', 20, 140);
      let y = 150;
      for (const cc of this.pz().cartelleCliniche) {
        doc.setFont('bold');
        doc.text(`Fase: ${cc.fase}`, 25, y);
        doc.setFont('normal');
        y += 8;
        doc.text(`Diagnosi: ${cc.diagnosi}`, 25, y);
        y += 8;
        doc.text(`Trattamento: ${cc.trattamento}`, 25, y);
        y += 8;
        doc.text(`Note: ${cc.note}`, 25, y);
        y += 12;
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      }
    }

    doc.save(`referto_${this.pz().cognome}_${this.pz().nome}.pdf`);
  }

  onChangeInput(){
    this.api.storiaPaziente(this.pz().codice)

  }
  validateInput():boolean{
    if (!this.selectedOptions) return false;
    return true
  }
}
