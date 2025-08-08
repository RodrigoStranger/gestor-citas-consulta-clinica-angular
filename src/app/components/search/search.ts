import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class Search {
  @Input() placeholder: string = 'Buscar';
}
