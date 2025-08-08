export interface Usuario {
  id_usuario: number;
  dni: string;
  correo: string;
  telefono: string;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  activo: number;
  fechaRegistro: string;
  rolPorDefecto: string;
}

export interface Medico {
  id_medico: number;
  usuario: Usuario;
  especialidad: string;
}
