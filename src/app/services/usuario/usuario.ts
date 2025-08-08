import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Usuario {
  private apiUrl = 'https://api.example.com/usuarios'; // Cambia esto por tu URL de API real

  constructor(private http: HttpClient) {}


}
