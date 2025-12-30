import { useMemo, useState } from "react";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/Horarios.css";

// Importamos nuestras piezas nuevas
import { useHorariosData } from "../hooks/useHorariosData";
import { SubjectsSidebar } from "./SubjectsSidebar";
import { SelectedSummary } from "./SelectedSummary";
import { SUBJECT_COLORS } from "../utils/constants";

dayjs.locale("es");
const localizer = dayjsLocalizer(dayjs);

// Configuración visual del calendario
const range = (date) => {
  const start = dayjs(date).day(1);
  return Array.from({ length: 6 }, (_, i) => start.add(i, "day").toDate());
};

const formats = { dayFormat: "dddd" };

export function Horarios({ onBack }) {
  // Componente: Horarios
  // Descripción: Muestra un calendario semanal con los horarios cargados desde
  // el hook `useHorariosData`. Proporciona una barra lateral con las materias
  // y un resumen de selecciones.
  // Props:
  // - onBack: callback que vuelve a la pantalla anterior

  // 1. Usamos el Hook para obtener datos
  const { selectedYear, setSelectedYear, subjects, schedules, loading } =
    useHorariosData();

  // 2. Estado local de la interfaz (selecciones)
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  // Lógica de filtrado visual (Materia seleccionada OR Horarios guardados)
  const displayedEvents = useMemo(() => {
    if (!selectedSubject) return schedules;
    return schedules.filter(
      (event) =>
        event.materia === selectedSubject || selectedIds.includes(event.id)
    );
  }, [schedules, selectedSubject, selectedIds]);

  // Alterna el filtro de materia: si ya está seleccionada, la quita
  const handleSelectSubject = (id) => {
    setSelectedSubject((prev) => (prev === id ? null : id));
  };

  // Selecciona o deselecciona todos los eventos de una comisión
  const toggleSchedule = (eventId) => {
    const clickedEvent = schedules.find((e) => e.id === eventId);
    if (!clickedEvent) return;

    const { materia, comision } = clickedEvent;
    // Obtener todos los eventos de esta materia y comisión
    const groupIds = schedules
      .filter((e) => e.materia === materia && e.comision === comision)
      .map((e) => e.id);

    const todosSeleccionados = groupIds.every((id) => selectedIds.includes(id));

    setSelectedIds((prev) => {
      // Si todos están seleccionados, los deselecciona
      if (todosSeleccionados) {
        return prev.filter((id) => !groupIds.includes(id));
      }
      // Si no, deselecciona otros de la misma materia y selecciona estos
      const conOtraMateria = prev.filter((id) => {
        const ev = schedules.find((s) => s.id === id);
        return ev && ev.materia !== materia;
      });
      return [...conOtraMateria, ...groupIds];
    });
  };

  // Estilos visuales: evento seleccionado = color brillante, no seleccionado = gris opaco
  const getEventStyle = (event) => {
    const isSelected = selectedIds.includes(event.id);
    const color = SUBJECT_COLORS[event.materia] || "#999";

    return {
      style: {
        backgroundColor: isSelected ? color : "#e0e0e0",
        color: isSelected ? "white" : "#666",
        border: `2px solid ${color}`,
        borderRadius: 6,
        opacity: isSelected ? 1 : 0.5,
      },
    };
  };

  return (
    <div className="horarios">
      <header className="horarios-header">
        <button className="back-button" onClick={onBack}>
          ← Volver
        </button>
        <h1>Selecciona tus Horarios</h1>
      </header>

      <div className="horarios-container">
        <SubjectsSidebar
          year={selectedYear}
          setYear={setSelectedYear}
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSelectSubject={handleSelectSubject}
          loading={loading}
        />

        <main className="calendar-wrapper">
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              Cargando...
            </div>
          ) : (
            <>
              <Calendar
                localizer={localizer}
                events={displayedEvents}
                startAccessor="start"
                endAccessor="end"
                defaultDate={dayjs().toDate()}
                view={Views.WEEK}
                views={[Views.WEEK]}
                range={range}
                formats={formats}
                min={dayjs().hour(8).minute(0).toDate()}
                max={dayjs().hour(23).minute(0).toDate()}
                step={30}
                timeslots={2}
                onSelectEvent={(e) => toggleSchedule(e.id)}
                eventPropGetter={getEventStyle}
                style={{ height: "100%", minHeight: 600 }}
              />

              <SelectedSummary
                selectedIds={selectedIds}
                schedules={schedules}
                subjects={subjects}
                onRemove={toggleSchedule}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
