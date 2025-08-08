import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicosComponent} from './pages/medicos/medicos';
import { CalendarComponent } from './components/calendar/calendar';
export const routes: Routes = [
  {
    path: 'medicos',
    component: MedicosComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  }
];
