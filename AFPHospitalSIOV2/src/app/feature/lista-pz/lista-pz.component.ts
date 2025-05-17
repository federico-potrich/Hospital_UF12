import { Component, inject } from '@angular/core';
import { AFPHospitalAPIService } from '../../core/services/afphospital-api.service';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-lista-pz',
  imports: [DatePipe, RouterLink],
  templateUrl: './lista-pz.component.html',
  styleUrl: './lista-pz.component.scss'
})
export class ListaPzComponent {
  api = inject(AFPHospitalAPIService);
}
