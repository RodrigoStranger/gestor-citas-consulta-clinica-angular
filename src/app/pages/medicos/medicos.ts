import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico/medico.model';
import { Medico as MedicoService } from '../../services/medico/medico';
import { CommonModule } from '@angular/common';
import { Nabvar } from '../../components/nabvar/nabvar';
import { Search } from '../../components/search/search';

@Component({
  selector: 'app-medicos',
  imports: [CommonModule, Nabvar, Search],
  templateUrl: './medicos.html',
  styleUrls: ['./medicos.css']
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  activo: "habilitados" | "deshabilitados" = "habilitados";

  constructor(private medicoService: MedicoService) { }

  ngOnInit(): void {
    this.obtenerMedicos();
  }

  obtenerMedicos(): void {
    this.medicoService.obtenerMedicos(this.activo).subscribe({
      next: (response) => {
        this.medicos = response.data;
      },
      error: (error) => {
        console.error('Error al obtener los médicos:', error);
      }
    });
  }
}
