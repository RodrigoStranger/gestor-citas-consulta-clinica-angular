import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico/medico.model';
import { Medico as MedicoService } from '../../services/medico/medico';
import { CommonModule } from '@angular/common';
import { Nabvar } from '../../components/nabvar/nabvar';
import { Search } from '../../components/search/search';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import ModelError, { FieldError } from '../../models/error/error.model';
import { formatFechaNacimiento } from '../../utils/formatFechaNacimiento';

@Component({
  selector: 'app-medicos',
  imports: [CommonModule, Nabvar, Search, ReactiveFormsModule],
  templateUrl: './medicos.html',
  styleUrls: ['./medicos.css']
})
export class MedicosComponent implements OnInit {
  showClave = false;
  idMedicoParaHabilitar: number | null = null;

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
      clave: ['', Validators.required],
      telefono: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      especialidad: ['', Validators.required]
    });
  }

  guardarMedico() {
    if (!this.formMedico.valid) return false;
    const medicoData = { ...this.formMedico.value };
    if (medicoData.fechaNacimiento) {
      medicoData.fechaNacimiento = formatFechaNacimiento(medicoData.fechaNacimiento);
    }
    this.medicoService.crearMedico(medicoData).subscribe({
      next: (response) => {
        const modal = document.getElementById('staticBackdrop');
        if (modal) {
          (window as any).bootstrap?.Modal.getOrCreateInstance(modal)?.hide();
        }
        Swal.fire({
          title: 'Éxito',
          text: response?.message || 'Medico registrado correctamente (default)',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.obtenerMedicos();
        this.formMedico.reset();
      },
      error: (e: any) => {
        const errorResponse = e.error as ModelError;
        let text = errorResponse.message;
        if (Array.isArray(errorResponse.errors) && errorResponse.errors.length > 0) {
          text += '\n';
          text += errorResponse.errors.map((err: FieldError) => `• ${err.message}`).join('\n');
        }
        Swal.fire({
          icon: 'warning',
          title: errorResponse.errorCode ? `${errorResponse.errorCode}` : 'Error',
          text,
        });
      }
    });
    return true;
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

  abrirModalConfirmacion(id_medico: number) {
    this.idMedicoParaHabilitar = id_medico;
    const modal = document.getElementById('modalConfirmarHabilitar');
    if (modal) {
      (window as any).bootstrap?.Modal.getOrCreateInstance(modal)?.show();
    }
  }

  confirmarHabilitarMedico() {
    if (this.idMedicoParaHabilitar == null) return;
    this.medicoService.cambiarEstadoMedico(this.idMedicoParaHabilitar, 1).subscribe({
      next: (response) => {
        const modal = document.getElementById('modalConfirmarHabilitar');
        if (modal) {
          (window as any).bootstrap?.Modal.getOrCreateInstance(modal)?.hide();
        }
        Swal.fire({
          title: 'Éxito',
          text: response?.message || 'Médico habilitado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.obtenerMedicos();
        this.idMedicoParaHabilitar = null;
      },
      error: (e: any) => {
        const errorResponse = e.error as ModelError;
        let text = errorResponse.message;
        if (Array.isArray(errorResponse.errors) && errorResponse.errors.length > 0) {
          text += '\n';
          text += errorResponse.errors.map((err: FieldError) => `• ${err.message}`).join('\n');
        }
        Swal.fire({
          icon: 'warning',
          title: errorResponse.errorCode ? `${errorResponse.errorCode}` : 'Error',
          text,
        });
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
