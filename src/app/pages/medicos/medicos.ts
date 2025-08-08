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
  medicosFiltrados: Medico[] = [];
  activo: "habilitados" | "deshabilitados" = "habilitados";
  textoBoton: string = 'Ver deshabilitados';
  alternarDisponibles(): void {
    this.activo = this.activo === 'habilitados' ? 'deshabilitados' : 'habilitados';
    this.textoBoton = this.activo === 'habilitados' ? 'Ver deshabilitados' : 'Ver habilitados';
    this.obtenerMedicos();
  }

  constructor(private medicoService: MedicoService) { }

  ngOnInit(): void {
    this.obtenerMedicos();
  }

  obtenerMedicos(): void {
    this.medicoService.obtenerMedicos(this.activo).subscribe({
      next: (response) => {
        this.medicos = response.data;
        this.medicosFiltrados = response.data;
      },
      error: (error) => {
        console.error('Error al obtener los médicos:', error);
      }
    });
  }

  filtrarMedicos(texto: string): void {
    if (!texto.trim()) {
      this.medicosFiltrados = this.medicos;
    } else {
      this.medicosFiltrados = this.medicos.filter(medico =>
        medico.usuario.nombre.toLowerCase().includes(texto.toLowerCase())
      );
    }
  }
}
