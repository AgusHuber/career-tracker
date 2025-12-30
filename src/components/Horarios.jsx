import { useState } from "react";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/Horarios.css";

const localizer = dayjsLocalizer(dayjs);

export function Horarios({ onBack }) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [view, setView] = useState(Views.WEEK);

  // Datos de ejemplo de materias con horarios
  const subjects = [
    {
      id: 1,
      name: "Física I",
      color: "#FF6B6B",
      schedules: [
        {
          id: "sch1",
          title: "Física I - Comisión A (1H10)",
          start: new Date(2025, 11, 1, 14, 55),
          end: new Date(2025, 11, 1, 17, 10),
          classroom: "1H10",
          status: "available",
        },
        {
          id: "sch2",
          title: "Física I - Comisión B (2K7)",
          start: new Date(2025, 11, 3, 12, 0),
          end: new Date(2025, 11, 3, 15, 50),
          classroom: "2K7",
          status: "available",
        },
      ],
    },
    {
      id: 2,
      name: "Análisis Matemático I",
      color: "#4ECDC4",
      schedules: [
        {
          id: "sch3",
          title: "Análisis Matemático I (1H10)",
          start: new Date(2025, 11, 3, 13, 15),
          end: new Date(2025, 11, 3, 17, 0),
          classroom: "1H10",
          status: "available",
        },
      ],
    },
    {
      id: 3,
      name: "Análisis Matemático II",
      color: "#FFE66D",
      schedules: [
        {
          id: "sch4",
          title: "Análisis Matemático II (1H9)",
          start: new Date(2025, 11, 4, 13, 15),
          end: new Date(2025, 11, 4, 17, 0),
          classroom: "1H9",
          status: "available",
        },
      ],
    },
    {
      id: 4,
      name: "Legislación",
      color: "#95E1D3",
      schedules: [
        {
          id: "sch5",
          title: "Legislación (4K4)",
          start: new Date(2025, 11, 3, 19, 55),
          end: new Date(2025, 11, 3, 22, 55),
          classroom: "4K4",
          status: "available",
        },
      ],
    },
  ];

  // Obtener eventos de la materia seleccionada
  const calendarEvents = selectedSubject
    ? selectedSubject.schedules.map((sch) => ({
        ...sch,
        isSelected: selectedSchedules.includes(sch.id),
      }))
    : [];

  // Todos los eventos para visualizar los seleccionados
  const allSelectedEvents = selectedSchedules.map((scheduleId) => {
    for (let subject of subjects) {
      const schedule = subject.schedules.find((s) => s.id === scheduleId);
      if (schedule) {
        return {
          ...schedule,
          isSelected: true,
          resourceId: subject.id,
        };
      }
    }
    return null;
  });

  const handleSelectSchedule = (scheduleId) => {
    setSelectedSchedules((prev) =>
      prev.includes(scheduleId)
        ? prev.filter((id) => id !== scheduleId)
        : [...prev, scheduleId]
    );
  };

  const handleSelectEvent = (event) => {
    if (event.isSelected) {
      handleSelectSchedule(event.id);
    }
  };

  return (
    <div className="horarios">
      <div className="horarios-header">
        <button className="back-button" onClick={onBack}>
          ← Volver
        </button>
        <h1>Organizador de Horarios</h1>
      </div>

      <div className="horarios-container">
        {/* Selector de materias */}
        <div className="subjects-selector">
          <h3>Selecciona una materia:</h3>
          <div className="subjects-list">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                className={`subject-btn ${
                  selectedSubject?.id === subject.id ? "active" : ""
                }`}
                onClick={() => setSelectedSubject(subject)}
                style={{
                  borderLeftColor: subject.color,
                  backgroundColor:
                    selectedSubject?.id === subject.id
                      ? `${subject.color}20`
                      : "transparent",
                }}
              >
                {subject.name}
              </button>
            ))}
          </div>
        </div>

        {/* Calendario */}
        <div className="calendar-wrapper">
          {selectedSubject && (
            <div className="schedules-info">
              <h3>Horarios disponibles - {selectedSubject.name}</h3>
              <div className="schedule-chips">
                {calendarEvents.map((schedule) => (
                  <button
                    key={schedule.id}
                    className={`schedule-chip ${
                      selectedSchedules.includes(schedule.id) ? "selected" : ""
                    }`}
                    onClick={() => handleSelectSchedule(schedule.id)}
                    style={{
                      borderColor: selectedSubject.color,
                      backgroundColor: selectedSchedules.includes(schedule.id)
                        ? selectedSubject.color
                        : "transparent",
                      color: selectedSchedules.includes(schedule.id)
                        ? "white"
                        : "#333",
                    }}
                  >
                    {schedule.title} - {schedule.classroom}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Calendar
            localizer={localizer}
            events={calendarEvents.concat(allSelectedEvents)}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600, marginTop: 20 }}
            view={view}
            onView={setView}
            views={["week"]}
            defaultDate={new Date(2025, 11, 1)}
            step={30}
            showMultiDayTimes
            onSelectEvent={handleSelectEvent}
            eventPropGetter={(event) => {
              const style = {
                backgroundColor: event.isSelected ? "#333" : "#ccc",
                borderRadius: "4px",
                opacity: event.isSelected ? 1 : 0.6,
                color: "white",
                border: "none",
                display: "block",
              };
              return { style };
            }}
          />
        </div>
      </div>
    </div>
  );
}
