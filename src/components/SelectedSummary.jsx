// Componente: SelectedSummary
// Props:
// - selectedIds: array de IDs de eventos actualmente seleccionados en el calendario
// - schedules: array de todos los objetos de eventos (utilizado para buscar detalles del evento)
// - subjects: array de objetos de materias (utilizado para resolver nombres legibles)
// - onRemove: callback para remover/deseleccionar un evento (recibe un ID de evento)

export function SelectedSummary({
  selectedIds,
  schedules,
  subjects,
  onRemove,
}) {
  if (selectedIds.length === 0) {
    return (
      <div className="selected-summary">
        <h4>Seleccionados (0)</h4>
        <p>No hay horarios seleccionados</p>
      </div>
    );
  }

  // Agrupar selecciones por "materia-comisión" para evitar duplicados
  const seleccionesUnicas = [
    ...new Set(
      selectedIds.map((id) => {
        const evento = schedules.find((s) => s.id === id);
        return evento ? `${evento.materia}-${evento.comision}` : null;
      })
    ),
  ].filter(Boolean);

  return (
    <div className="selected-summary">
      <h4>Seleccionados ({selectedIds.length})</h4>
      <ul>
        {seleccionesUnicas.map((clave) => {
          const [materia, comision] = clave.split("-");
          const nombreMateria =
            subjects.find((s) => s.id === materia)?.name || materia;

          return (
            <li key={clave}>
              <span>
                {nombreMateria} ({comision})
              </span>
              <button
                className="remove-btn"
                onClick={() => {
                  const evento = schedules.find(
                    (e) => e.materia === materia && e.comision === comision
                  );
                  if (evento) onRemove(evento.id);
                }}
              >
                ✕
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
