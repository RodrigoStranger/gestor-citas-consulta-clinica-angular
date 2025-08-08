import { Component, AfterViewInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  template: `<div id="calendar"></div>`,
  styleUrls: ['./calendar.css']
})
export class CalendarComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const calendarEl = document.getElementById('calendar');

    if (calendarEl) {
      const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek', // Vista semanal
        editable: true,
        selectable: true,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek'
        },
        firstDay: 1,
        slotMinTime: '07:00:00',
        slotMaxTime: '20:00:00',
        dateClick: (info) => {
          alert(`Fecha seleccionada: ${info.dateStr}`);
        },
        events: [
          { title: 'Reunión', start: '2025-08-11T10:00:00', end: '2025-08-11T12:00:00' },
          { title: 'Cita médica', start: '2025-08-13' }
        ]
      });

      calendar.render();
    }
  }

}
