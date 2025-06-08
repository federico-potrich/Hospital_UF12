import { Component, inject } from '@angular/core';
import { LoginService } from '../../core/services/login/login.service';
import { TableModule } from 'primeng/table';
import { AFPHospitalAPIService } from '../../core/services/afphospital-api.service';
// import { Paziente } from '../../core/models/Paziente.model';
import { RepartoComponent } from '../../core/components/reparto/reparto.component';

@Component({
  selector: 'app-homepage',
  imports: [TableModule, RepartoComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  loginService = inject(LoginService)
  api = inject(AFPHospitalAPIService);

  constructor(){
    this.api.getListaPazienti()

  }
}
