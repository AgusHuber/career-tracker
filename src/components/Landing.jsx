import "../styles/Landing.css";

export function Landing({ onSelectOption }) {
  return (
    <div className="landing">
      <div className="landing-container">
        <div className="landing-header">
          <h1>Career Tracker</h1>
          <p className="landing-subtitle">Gestiona tu carrera universitaria</p>
        </div>

        <div className="options-grid">
          <button
            className="option-card horarios-card"
            onClick={() => onSelectOption("horarios")}
          >
            <div className="card-icon">📅</div>
            <h2>Horarios</h2>
            <p>
              Visualiza los horarios disponibles de tus materias en un
              calendario semanal. Selecciona una materia y elige tu horario
              preferido.
            </p>
          </button>

          <button
            className="option-card materias-card"
            onClick={() => onSelectOption("materias")}
          >
            <div className="card-icon">📚</div>
            <h2>Materias</h2>
            <p>
              Registra el estado de tus materias (aprobada, regular, libre) y
              descubre qué asignaturas puedes cursar según las correlatividades.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
