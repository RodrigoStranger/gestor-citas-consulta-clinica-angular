import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico as MedicoModel } from '../../models/medico/medico.model';

@Injectable({
  providedIn: 'root'
})

export class Medico {

  url = "http://localhost:8080/api/medicos";

  constructor(private readonly http:HttpClient) { }

  crearMedico(medico: MedicoModel): Observable<any> {
    return this.http.post(this.url, medico);
  }

  obtenerMedicos(estado: "habilitado" | "deshabilitado"): Observable<any>{
    return this.http.get(`${this.url}/${estado}`);
  }

  obtenerEspecialidades(): Observable<any> {
    return this.http.get(`${this.url}/especialidades`);
  }

  obtenerMedicoPorId(id_medico:number): Observable<any> {
    return this.http.get(`${this.url}/${id_medico}`);
  }

  obtenerHorariosPorMedico(id_medico:number): Observable<any> {
    return this.http.get(`${this.url}/${id_medico}/horarios`);
  }

  actualizarEspecialidadMedico(id_medico: number, especialidad: string): Observable<any> {
    return this.http.put(`${this.url}/${id_medico}/especialidad`, { especialidad });
  }

  cambiarEstadoMedico(id_medico: number, nuevoEstado: 1 | 0): Observable<any> {
    return this.http.put(`${this.url}/${id_medico}/estado/${nuevoEstado}`, {});
  }

  asignarHorarioMedico(idMedico: number, idHorario: number): Observable<any> {
    return this.http.post(`${this.url}/asignar-horario`, { idMedico, idHorario });
  }



}
