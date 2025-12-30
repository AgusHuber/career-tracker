import { YEAR_CONFIG } from "../utils/constants";

// Componente: SubjectsSidebar
// Barra lateral con selector de año y lista de materias filtrable.
// Props:
// - year: año actual (número)
// - setYear: cambia el año
// - subjects: array de materias { id, name, color }
// - selectedSubject: materia filtrada actualmente
// - onSelectSubject: callback al seleccionar materia
// - loading: si está cargando

export function SubjectsSidebar({
  year,
  setYear,
  subjects,
  selectedSubject,
  onSelectSubject,
}) {
  return (
    <aside className="subjects-selector">
      <h3>Materias</h3>

      {/* Selector de año */}
      <div style={{ marginBottom: "15px" }}>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="year-select"
        >
          {Object.entries(YEAR_CONFIG).map(([num, config]) => (
            <option key={num} value={num}>
              {config.label}
            </option>
          ))}
        </select>
      </div>

      <p style={{ fontSize: "0.8rem", color: "#666", marginBottom: "10px" }}>
        Selecciona una materia para filtrar.
      </p>

      {/* Lista de materias */}
      {
        <div className="subjects-list">
          {subjects.map((materia) => (
            <button
              key={materia.id}
              className={`subject-btn ${
                selectedSubject === materia.id ? "active" : ""
              }`}
              onClick={() => onSelectSubject(materia.id)}
              style={{
                borderLeft: `5px solid ${materia.color}`,
                opacity:
                  selectedSubject && selectedSubject !== materia.id ? 0.5 : 1,
              }}
            >
              {materia.name}
            </button>
          ))}
        </div>
      }
    </aside>
  );
}
