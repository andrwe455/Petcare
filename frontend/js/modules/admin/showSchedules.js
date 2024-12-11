window.onload = function() {

  fetch('/veterinarians').then(response => response.json())
  .then(data => {
    
    data.forEach(element => {
      let option;
      option = document.createElement('option');
      
      option.text = element.name + ' ' + element.lastName;
      option.value = element.name + ' ' + element.lastName;
      document.getElementById('doctor').add(option)
    });
  })
  
}

function showSchedule(id) {
  let calendarContainer = document.getElementById('calendar');

  fetch('/getSchedule/' + id.value)
    .then(response => response.json())
    .then(data => {
      // Limpiar el contenido del calendario
      calendarContainer.innerHTML = '';

      // Crear una nueva instancia de FullCalendar
      var Calendar = FullCalendar.Calendar;

      // Convertir los eventos obtenidos al formato requerido por FullCalendar
      const events = data.map(element => {
        const isoDate = element.date;

        let start, end;
        try {
          // Parsear la fecha desde el formato ISO UTC
          start = new Date(isoDate); // La fecha en UTC directamente

          if (isNaN(start.getTime())) {
            throw new Error('Fecha inválida: ' + isoDate);
          }

          // Crear la hora de finalización (sumar 30 minutos)
          end = new Date(start.getTime() + 30 * 60000); // Sumar 30 minutos en milisegundos
        } catch (error) {
          console.error('Error procesando la fecha:', error);
          return null;
        }

        return {
          title: 'Appointment',
          start: start.toISOString(), // Mantener UTC al pasarlo a FullCalendar
          end: end.toISOString(),
          allDay: false,
          backgroundColor: 'green',
          borderColor: 'green'
        };
      }).filter(event => event !== null); // Filtrar eventos nulos en caso de errores

      if (events.length === 0) {
        calendarContainer.innerHTML = '<p>No hay citas programadas para este veterinario.</p>';
        return
      }
      // Inicializar el calendario
      const calendar = new Calendar(calendarContainer, {
        initialView: 'timeGridWeek',
        locale: 'es',
        timeZone: 'UTC',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay'
        },
        height: 'auto',
        slotMinTime: '08:00:00',
        slotMaxTime: '17:00:00',
        hiddenDays: [0, 6],
        themeSystem: 'bootstrap',
        events: events,
        eventClick: function (info) {
          console.log(info.event);
        }
      });

      // Renderizar el calendario
      calendar.render();
    });
}

