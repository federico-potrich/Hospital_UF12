import { Component, computed, inject, input, OnInit } from '@angular/core';
import { Paziente } from '../../models/Paziente.model';
import { DatePipe, JsonPipe } from '@angular/common';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { AFPHospitalAPIService } from '../../services/afphospital-api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";
import { font_Barcode } from './variables';

@Component({
    selector: 'app-paziente',
    imports: [DatePipe, CascadeSelectModule, FormsModule, DatePipe],
    templateUrl: './paziente.component.html',
    styleUrl: './paziente.component.scss'
})
export class PazienteComponent {
    pz = input.required<any>()

    api = inject(AFPHospitalAPIService);

    pzComp = computed(() => this.pz())

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

    selectedOptions: any;
    ActionPatience() {
        if (this.selectedOptions.id_reparto) {
            this.api.traferisciPaziente(this.selectedOptions.id_reparto, this.pz().id_paziente)
        } else if (this.selectedOptions.id_ospedale) {
            this.api.dimettiPaziente(this.pz().id_paziente)
        } else if (this.selectedOptions.code == 'D') {

            if (this.api.listStoria().length !== 0) {
                this.generate()
                this.api.dimettiPaziente(this.pz().id_paziente)
                this.#router.navigate(['']);
            }
        }

    }
    generate() {
        const doc = new jsPDF();

        // Titolo
        doc.setFontSize(16);
        doc.text('Referto Clinico Paziente', 105, 20, { align: 'center' });


        let font = font_Barcode


        let imgApss = new Image(50, 15)
        imgApss.src = 'APSSlogo.png'
        doc.addImage(imgApss, '', 10, 10, 50, 15)
        // Dati Anagrafici
        doc.setFontSize(20);
        doc.text(`Dati Anagrafici`, 20, 42)
        doc.setFontSize(12);
        doc.text(`Cognome, Nome: ${this.pz().cognome}, ${this.pz().nome}`, 20, 50);
        doc.text(`Data di nascita: ${this.pz().data_nascita}`, 20, 55);
        doc.text(`Codice fiscale: ${this.pz().codice_fiscale}`, 20, 60);

        // Info Paziente
        doc.text(`Codice Paziente: ${this.pz().codice}`, 20, 70);
        doc.addFileToVFS("MyBarcodeFont.ttf", font);
        doc.addFont("MyBarcodeFont.ttf", "MyBarcodeFont", "normal");
        doc.setFont("MyBarcodeFont");
        doc.setFontSize(20);

        // Se il font è di tipo Code39, ricordati di incorniciare il codice con asterischi
        doc.text(`*${this.pz().codice}*`, 150, 70);

        // Torna al font normale (es. Helvetica)
        doc.setFont("helvetica");
        doc.setFontSize(12);  // o la dimensione che preferisci

        doc.text(`Codice Colore: ${this.pz().codice_colore}`, 20, 100);
        doc.text(`Stato: ${this.pz().stato}`, 20, 110);
        doc.text(`Reparto: ${this.api.listaRep().filter(rep => rep)[0].nome}`, 20, 120);

        // Cartelle cliniche (se presenti)
        if (this.api.listStoria().length > 0) {
            doc.text('Cartelle Cliniche:', 20, 140);
            let y = 150;
            for (const cc of this.api.listStoria()) {
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
                if (cc.fase == 'DIMMISSIONE') {
                     y += 10;  // piccolo spazio extra dopo le note DIMISSIONE
                    const nomeMedico = cc.medico;  // prendi il nome medico dinamicamente se puoi
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(12);

                    // Calcola posizione X per allineare a destra con un margine
                    const pageWidth = doc.internal.pageSize.getWidth();
                    const margineDestro = 20;
                    const textWidth = doc.getTextWidth(nomeMedico);
                    const xPos = pageWidth - textWidth - margineDestro;
                    console.log(xPos)
                    doc.text(`${nomeMedico}`, xPos, y);

                    y += 15;
                }
            }
        }

        doc.save(`referto_${this.pz().cognome}_${this.pz().nome}.pdf`);
    }

    onChangeInput() {
        this.api.storiaPaziente(this.pz().codice)

    }
    validateInput(): boolean {
        if (!this.selectedOptions) return false;
        return true
    }
}
