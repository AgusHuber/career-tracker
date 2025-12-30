import { useMemo, useState, useEffect, useRef } from "react";
import { materias } from "../data/materias";
import "../styles/Materias.css";

// Prioridades numéricas para comparar estados de materias
// Permite saber si una materia cumple los requisitos de correlatividad
const STATUS_PRIORITY = {
  "No Cursada": 0,
  Cursable: 1,
  Regular: 2,
  Aprobado: 3,
};

// Configuración visual de cada estado: clase CSS e ícono SVG
const STATUS_CONFIG = {
  "No Cursada": {
    className: "status-chip--no-cursada",
    icon: () => (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="8"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
        />
      </svg>
    ),
  },
  Cursable: {
    className: "status-chip--cursable",
    icon: () => (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="8"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.35"
          fill="none"
        />
        <path
          d="M9 8l6 4-6 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  Regular: {
    className: "status-chip--regular",
    icon: () => (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="8"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M12 4c4.41 0 8 3.59 8 8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },
  Aprobado: {
    className: "status-chip--aprobado",
    icon: () => (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          fill="currentColor"
        />
      </svg>
    ),
  },
};

// Opciones de estado que el usuario puede seleccionar manualmente
const STATUS_OPTIONS = ["No Cursada", "Regular", "Aprobado"];

// Convierte un nombre de estado en un slug CSS (ej: "No Cursada" -> "no-cursada")
const toStatusSlug = (status) => status.replace(/\s+/g, "-").toLowerCase();

// Selector de estado para que el usuario cambie manualmente el progreso de una materia
const StatusSelector = ({ value, onChange }) => (
  <div
    className="status-selector"
    role="group"
    aria-label="Actualizar situación"
  >
    {STATUS_OPTIONS.map((option) => {
      const isActive = value === option;
      const config = STATUS_CONFIG[option];
      const Icon = config.icon;
      return (
        <button
          type="button"
          key={option}
          className={`status-selector__option status-selector__option--${toStatusSlug(
            option
          )} ${isActive ? "is-active" : ""}`}
          onClick={() => onChange(option)}
          aria-pressed={isActive}
          title={`Marcar como ${option}`}
        >
          <Icon />
          <span className="sr-only">{option}</span>
        </button>
      );
    })}
  </div>
);

// Convierte número de año en texto legible (1 -> "Primer año")
const getAnioLabel = (anio) => {
  const labels = {
    1: "Primer",
    2: "Segundo",
    3: "Tercer",
    4: "Cuarto",
    5: "Quinto",
  };
  return `${labels[anio] || anio} año`;
};

// Convierte código de cuatrimestre en texto (0 -> "Anual", otro -> "Cuatrimestral")
const getCuatrimestreLabel = (cuatrimestre) => {
  if (cuatrimestre === 0) return "Anual";
  return "Cuatrimestral";
};

// Pasos del tutorial interactivo que guía al usuario la primera vez
const TUTORIAL_STEPS = [
  {
    target: "materia-1",
    title: "¡Bienvenido al Career Tracker!",
    message:
      "Esta es una materia de tu plan de estudios. Aquí puedes ver su nombre, código, año y si es anual o cuatrimestral.",
    position: "right",
    highlightType: "element",
  },
  {
    target: "prereqs-1",
    title: "Sin Correlativas",
    message:
      "Esta materia no tiene correlativas, por lo que puedes cursarla desde el inicio. Otras materias mostrarán aquí sus requisitos previos.",
    position: "right",
    highlightType: "element",
  },
  {
    target: "status-selector-1",
    title: "Cambiar Estado",
    message:
      "Presiona los botones para cambiar el estado y mira cómo cambia el color de la materia en tiempo real.",
    position: "top",
    highlightType: "statuses",
  },
  {
    target: "stats-panel",
    title: "Panel de Resumen",
    message: "Aquí verás tu progreso actualizado automáticamente.",
    position: "left",
    highlightType: "element",
  },
  {
    target: null,
    title: "Guardado Automático",
    message:
      'Tu progreso se guarda automáticamente en tu navegador. Presiona "Finalizar" para comenzar.',
    position: "center",
    highlightType: null,
  },
];

// Componente principal que gestiona toda la vista de materias
export function Materias({ onBack }) {
  // Estado del progreso del usuario (qué materias aprobó, regularizó, etc.)
  // Se carga desde localStorage al iniciar
  const [userProgress, setUserProgress] = useState(() => {
    const savedProgress = localStorage.getItem("career-tracker-progress");
    if (savedProgress) {
      try {
        return JSON.parse(savedProgress);
      } catch (error) {
        console.error("Error al cargar progreso guardado:", error);
      }
    }

    // Si no hay progreso guardado, inicializa todas como "No Cursada"
    return materias.reduce((acc, materia) => {
      acc[materia.numero] = "No Cursada";
      return acc;
    }, {});
  });

  // Pestaña activa (Plan de Carrera, Electivas, Extras)
  const [activeTab, setActiveTab] = useState("plan");

  // Estado del panel de resumen (expandido o colapsado)
  const [panelExpanded, setPanelExpanded] = useState(true);

  // Controla si se muestra el tutorial (solo primera vez)
  const [showTutorial, setShowTutorial] = useState(() => {
    const tutorialCompleted = localStorage.getItem(
      "career-tracker-tutorial-completed"
    );
    return !tutorialCompleted;
  });

  // Paso actual del tutorial (0 a 4)
  const [tutorialStep, setTutorialStep] = useState(0);

  // Referencia al DOM para hacer scroll a la primera materia
  const materiaRef = useRef(null);

  // Guarda el progreso en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(
      "career-tracker-progress",
      JSON.stringify(userProgress)
    );
  }, [userProgress]);

  // Hace scroll automático al elemento resaltado en cada paso del tutorial
  useEffect(() => {
    if (showTutorial && TUTORIAL_STEPS[tutorialStep].target) {
      const targetId = TUTORIAL_STEPS[tutorialStep].target;
      const element = document.getElementById(targetId);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [showTutorial, tutorialStep]);

  // Mapeo rápido de número de materia -> objeto materia
  const materiaMap = useMemo(
    () =>
      materias.reduce((acc, materia) => {
        acc[materia.numero] = materia;
        return acc;
      }, {}),
    []
  );

  // Calcula el estado real de cada materia según correlatividades y progreso manual
  // Una materia puede ser:
  // - "No Cursada": no cumple correlativas
  // - "Cursable": cumple correlativas pero no fue marcada
  // - "Regular": el usuario la marcó como regular
  // - "Aprobado": el usuario la aprobó
  const computedStatuses = useMemo(() => {
    const cache = {};

    const evaluate = (numero) => {
      if (cache[numero]) return cache[numero];
      const materia = materiaMap[numero];
      if (!materia) return "No Cursada";

      const manualStatus = userProgress[numero];
      if (manualStatus === "Regular" || manualStatus === "Aprobado") {
        cache[numero] = manualStatus;
        return manualStatus;
      }

      // Si no tiene correlativas, es cursable
      if (!materia.prerequisitos?.length) {
        cache[numero] = "Cursable";
        return "Cursable";
      }

      // Verifica que todas las correlativas se cumplan
      const ready = materia.prerequisitos.every((pr) => {
        const prereqStatus = evaluate(pr.numero);
        return pr.tipo === "R"
          ? STATUS_PRIORITY[prereqStatus] >= STATUS_PRIORITY.Regular
          : STATUS_PRIORITY[prereqStatus] >= STATUS_PRIORITY.Aprobado;
      });

      cache[numero] = ready ? "Cursable" : manualStatus;
      return cache[numero];
    };

    materias.forEach((materia) => evaluate(materia.numero));
    return cache;
  }, [materiaMap, userProgress]);

  // Actualiza el estado manual de una materia cuando el usuario hace clic
  const handleStatusChange = (numero, nuevoEstado) => {
    setUserProgress((prev) => ({
      ...prev,
      [numero]: nuevoEstado,
    }));
  };

  // Filtra las materias por tipo (plan obligatorio, electivas, extras)
  const materiasPlan = materias.filter((m) => !m.electiva && !m.extra);
  const materiasElectivas = materias.filter((m) => m.electiva);
  const materiasExtras = materias.filter((m) => m.extra);

  // Calcula estadísticas globales del progreso del usuario
  const stats = useMemo(() => {
    const aprobadas = materiasPlan.filter(
      (m) => computedStatuses[m.numero] === "Aprobado"
    ).length;

    const finalesPendientes = materiasPlan.filter(
      (m) => computedStatuses[m.numero] === "Regular"
    ).length;

    const porCursar = materiasPlan.filter(
      (m) =>
        computedStatuses[m.numero] === "No Cursada" ||
        computedStatuses[m.numero] === "Cursable"
    ).length;

    // Suma puntos de electivas y extras aprobadas
    const puntosElectivas = [...materiasElectivas, ...materiasExtras].reduce(
      (sum, m) => {
        if (computedStatuses[m.numero] === "Aprobado" && m.puntos) {
          return sum + m.puntos;
        }
        return sum;
      },
      0
    );

    // Calcula porcentaje total (80% materias obligatorias + 20% electivas)
    const totalMateriasPlan = materiasPlan.length;
    const materiasAprobadas = aprobadas;
    const puntosCompletos = Math.min(puntosElectivas, 20);

    const porcentajeCarrera = Math.round(
      (materiasAprobadas / totalMateriasPlan) * 80 + (puntosCompletos / 20) * 20
    );

    return {
      porCursar,
      aprobadas,
      puntosElectivas,
      finalesPendientes,
      porcentajeCarrera,
    };
  }, [computedStatuses, materiasPlan, materiasElectivas, materiasExtras]);

  // Avanza al siguiente paso del tutorial o lo finaliza
  const handleNextTutorialStep = () => {
    if (tutorialStep < TUTORIAL_STEPS.length - 1) {
      setTutorialStep(tutorialStep + 1);
      setTimeout(() => {
        const materiaElement = document.getElementById("materia-1");
        if (materiaElement) {
          materiaElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    } else {
      setShowTutorial(false);
      localStorage.setItem("career-tracker-tutorial-completed", "true");
    }
  };

  // Salta el tutorial y lo marca como completado
  const handleSkipTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem("career-tracker-tutorial-completed", "true");
  };

  // Reinicia el tutorial desde el principio
  const handleRestartTutorial = () => {
    setShowTutorial(true);
    setTutorialStep(0);
    localStorage.removeItem("career-tracker-tutorial-completed");
  };

  // Renderiza la lista de materias con todos sus detalles
  const renderMateriasList = (lista, isElectiva = false) => (
    <div className="materias-board">
      {/* Encabezados de las columnas */}
      <div className="materias-board__head">
        <span>#</span>
        <span>Materia</span>
        <span>Correlativas</span>
        <span>Situación</span>
      </div>

      <div className="materias-list">
        {lista.map((materia) => {
          const estadoCalculado =
            computedStatuses[materia.numero] ?? "No Cursada";
          const estadoManual = userProgress[materia.numero];
          const rowStateClass = toStatusSlug(estadoCalculado);
          const currentStep = TUTORIAL_STEPS[tutorialStep];

          // Determina si esta materia debe resaltarse en el tutorial
          const highlightElement =
            showTutorial &&
            currentStep.target === `materia-${materia.numero}` &&
            currentStep.highlightType === "element";
          const highlightAlsoRowOnStatusStep =
            showTutorial &&
            currentStep.target === "status-selector-1" &&
            materia.numero === 1;
          const isHighlighted =
            highlightElement || highlightAlsoRowOnStatusStep;

          return (
            <article
              key={materia.numero}
              id={`materia-${materia.numero}`}
              className={`materia-row materia-row--${rowStateClass} ${
                isHighlighted ? "tutorial-highlight" : ""
              }`}
            >
              {/* Columna 1: Número de materia */}
              <div className="materia-row__cell materia-row__cell--year">
                <span className="materia-row__year">{materia.numero}</span>
              </div>

              {/* Columna 2: Nombre, código y detalles de la materia */}
              <div className="materia-row__cell materia-row__cell--title">
                <h3>{materia.nombre}</h3>
                <span className="materia-row__subcode">
                  <span className="materia-row__anio">
                    {getAnioLabel(materia.anio)} -{" "}
                  </span>
                  {materia.codigo}
                  <span className="materia-row__cuatrimestre">
                    {" "}
                    • {getCuatrimestreLabel(materia.cuatrimestre)}
                  </span>
                  {(isElectiva || materia.extra) && materia.puntos && (
                    <span className="materia-row__puntos">
                      {" "}
                      • {materia.puntos} pts
                    </span>
                  )}
                </span>
              </div>

              {/* Columna 3: Correlativas (prerequisitos) */}
              <div
                className="materia-row__cell materia-row__cell--prereqs"
                id={`prereqs-${materia.numero}`}
              >
                {materia.prerequisitos?.length ? (
                  <ul
                    className={
                      showTutorial &&
                      currentStep.target === `prereqs-${materia.numero}`
                        ? "tutorial-highlight"
                        : ""
                    }
                  >
                    {materia.prerequisitos.map((pr) => {
                      const prereqStatus =
                        computedStatuses[pr.numero] ?? "No Cursada";
                      const prereqMateria = materiaMap[pr.numero];
                      const isSatisfied =
                        pr.tipo === "R"
                          ? STATUS_PRIORITY[prereqStatus] >=
                            STATUS_PRIORITY.Regular
                          : STATUS_PRIORITY[prereqStatus] >=
                            STATUS_PRIORITY.Aprobado;
                      return (
                        <li key={`${materia.numero}-${pr.numero}-${pr.tipo}`}>
                          <button
                            type="button"
                            className={`prereq-chip prereq-chip--${
                              isSatisfied
                                ? toStatusSlug(prereqStatus)
                                : "no-cursada"
                            }`}
                            data-tooltip={prereqMateria?.nombre ?? "Materia"}
                          >
                            <span className="prereq-chip__code">
                              {pr.numero}
                            </span>
                            <span className="prereq-chip__type">{pr.tipo}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <span
                    className={`materia-row__empty ${
                      showTutorial &&
                      currentStep.target === `prereqs-${materia.numero}`
                        ? "tutorial-highlight"
                        : ""
                    }`}
                    id={`prereqs-${materia.numero}`}
                  >
                    —
                  </span>
                )}
              </div>

              {/* Columna 4: Selector de estado o advertencia de bloqueo */}
              <div
                className="materia-row__cell materia-row__cell--actions"
                id={`status-selector-${materia.numero}`}
              >
                {estadoCalculado === "No Cursada" &&
                !["Aprobado", "Regular"].includes(estadoManual) ? (
                  <div
                    className={`status-blocked ${
                      showTutorial &&
                      currentStep.target ===
                        `status-selector-${materia.numero}` &&
                      currentStep.highlightType === "statuses"
                        ? "tutorial-highlight"
                        : ""
                    }`}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        fill="currentColor"
                        d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
                      />
                    </svg>
                  </div>
                ) : (
                  <div
                    className={
                      showTutorial &&
                      currentStep.target ===
                        `status-selector-${materia.numero}` &&
                      currentStep.highlightType === "statuses"
                        ? "tutorial-highlight tutorial-highlight--statuses"
                        : ""
                    }
                  >
                    <StatusSelector
                      value={estadoManual}
                      onChange={(estado) =>
                        handleStatusChange(materia.numero, estado)
                      }
                    />
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="materias">
      <div className="materias-shell">
        {/* Header con botón para volver */}
        <div className="materias-header">
          <button className="back-button" onClick={onBack}>
            ← Volver
          </button>
        </div>

        {/* Pestañas para cambiar entre Plan, Electivas y Extras */}
        <div className="materias-tabs">
          <button
            className={`materias-tab ${
              activeTab === "plan" ? "is-active" : ""
            }`}
            onClick={() => setActiveTab("plan")}
          >
            Plan de Carrera
          </button>
          {materiasElectivas.length > 0 && (
            <button
              className={`materias-tab ${
                activeTab === "electivas" ? "is-active" : ""
              }`}
              onClick={() => setActiveTab("electivas")}
            >
              Electivas
            </button>
          )}
          {materiasExtras.length > 0 && (
            <button
              className={`materias-tab ${
                activeTab === "extras" ? "is-active" : ""
              }`}
              onClick={() => setActiveTab("extras")}
            >
              Extras
            </button>
          )}
        </div>

        {/* Renderiza la lista según la pestaña activa */}
        {activeTab === "plan" && renderMateriasList(materiasPlan)}
        {activeTab === "electivas" &&
          renderMateriasList(materiasElectivas, true)}
        {activeTab === "extras" && renderMateriasList(materiasExtras, true)}
      </div>

      {/* Panel flotante lateral con resumen de progreso */}
      <div
        id="stats-panel"
        className={`stats-panel ${
          panelExpanded ? "stats-panel--expanded" : "stats-panel--collapsed"
        } ${
          showTutorial && TUTORIAL_STEPS[tutorialStep].target === "stats-panel"
            ? "tutorial-highlight"
            : ""
        }`}
      >
        <div className="stats-panel__header">
          {/* Botón para expandir/colapsar el panel */}
          <button
            className="stats-panel__toggle"
            onClick={() => setPanelExpanded(!panelExpanded)}
            aria-label={panelExpanded ? "Minimizar panel" : "Expandir panel"}
          >
            {panelExpanded ? (
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="currentColor"
              >
                <circle cx="12" cy="5" r="2.5" />
                <rect x="10" y="11" width="4" height="12" rx="2" />
              </svg>
            )}
          </button>

          {/* Botón para reiniciar el tutorial */}
          <button
            className="tutorial-button"
            onClick={handleRestartTutorial}
            title="Ver tutorial nuevamente"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </button>
        </div>

        {/* Contenido del panel (solo visible cuando está expandido) */}
        {panelExpanded && (
          <div className="stats-panel__content">
            <h3 className="stats-panel__title">Resumen</h3>

            <div className="stats-panel__group">
              <div className="stats-panel__item stats-panel__item--highlight">
                <span className="stats-panel__label">Progreso</span>
                <span className="stats-panel__value stats-panel__value--large">
                  {stats.porcentajeCarrera}%
                </span>
              </div>

              <div className="stats-panel__item">
                <span className="stats-panel__label">Puntos Electivas</span>
                <span className="stats-panel__value">
                  {stats.puntosElectivas}/20
                </span>
              </div>
            </div>

            <div className="stats-panel__divider"></div>

            <div className="stats-panel__group">
              <div className="stats-panel__item stats-panel__item--por-cursar">
                <span className="stats-panel__label">Por Cursar</span>
                <span className="stats-panel__value">{stats.porCursar}</span>
              </div>

              <div className="stats-panel__item stats-panel__item--aprobadas">
                <span className="stats-panel__label">Aprobadas</span>
                <span className="stats-panel__value">{stats.aprobadas}</span>
              </div>

              <div className="stats-panel__item stats-panel__item--finales">
                <span className="stats-panel__label">Finales Pendientes</span>
                <span className="stats-panel__value">
                  {stats.finalesPendientes}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay oscuro del tutorial + diálogo de instrucciones */}
      {showTutorial && (
        <>
          <div className="tutorial-overlay" />
          <div
            className={`tutorial-dialog tutorial-dialog--${TUTORIAL_STEPS[tutorialStep].position}`}
          >
            <div className="tutorial-dialog__header">
              <h3>{TUTORIAL_STEPS[tutorialStep].title}</h3>
              <button
                className="tutorial-dialog__close"
                onClick={handleSkipTutorial}
                aria-label="Cerrar tutorial"
              >
                ×
              </button>
            </div>
            <div className="tutorial-dialog__content">
              <p style={{ whiteSpace: "pre-line" }}>
                {TUTORIAL_STEPS[tutorialStep].message}
              </p>
            </div>
            <div className="tutorial-dialog__footer">
              <span className="tutorial-dialog__progress">
                {tutorialStep + 1} de {TUTORIAL_STEPS.length}
              </span>
              <div className="tutorial-dialog__actions">
                <button
                  className="tutorial-dialog__button tutorial-dialog__button--secondary"
                  onClick={handleSkipTutorial}
                >
                  Saltar
                </button>
                <button
                  className="tutorial-dialog__button tutorial-dialog__button--primary"
                  onClick={handleNextTutorialStep}
                >
                  {tutorialStep < TUTORIAL_STEPS.length - 1
                    ? "Siguiente"
                    : "Finalizar"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
