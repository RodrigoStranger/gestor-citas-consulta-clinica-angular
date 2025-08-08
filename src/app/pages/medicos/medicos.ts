import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico/medico.model';
import { Medico as MedicoService } from '../../services/medico/medico';
import { CommonModule } from '@angular/common';
import { Nabvar } from '../../components/nabvar/nabvar';
import { Search } from '../../components/search/search';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-medicos',
  imports: [CommonModule, Nabvar, Search, ReactiveFormsModule],
  templateUrl: './medicos.html',
  styleUrls: ['./medicos.css']
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  medicosFiltrados: Medico[] = [];
  activo: "habilitados" | "deshabilitados" = "habilitados";
  textoBoton: string = 'Ver deshabilitados';
  formMedico: FormGroup;
  alternarDisponibles(): void {
    this.activo = this.activo === 'habilitados' ? 'deshabilitados' : 'habilitados';
    this.textoBoton = this.activo === 'habilitados' ? 'Ver deshabilitados' : 'Ver habilitados';
    this.obtenerMedicos();
  }

  constructor(private medicoService: MedicoService, private fb: FormBuilder) {
    this.formMedico = this.fb.group({
      dni: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      especialidad: ['', Validators.required]
    });
  }

  guardarMedico() {
    if (!this.formMedico.valid) return;
    console.log('Datos del médico:', this.formMedico.value);
  }

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
      const filtro = texto.toLowerCase();
      this.medicosFiltrados = this.medicos.filter(medico =>
        medico.usuario.nombre.toLowerCase().includes(filtro) ||
        medico.usuario.apellidos.toLowerCase().includes(filtro) ||
        medico.usuario.dni.toLowerCase().includes(filtro) ||
        medico.usuario.telefono.toLowerCase().includes(filtro) ||
        medico.usuario.correo.toLowerCase().includes(filtro)
      );
    }
  }
}
