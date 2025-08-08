import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class Search {
  onInputChange(valor: string) {
    if (!valor.trim()) {
      this.buscar.emit('');
    }
  }
  @Input() placeholder: string = 'Buscar';
  @Output() buscar = new EventEmitter<string>();
  valor: string = '';

  onBuscar() {
    this.buscar.emit(this.valor);
  }
}
