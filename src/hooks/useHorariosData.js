// src/hooks/useHorariosData.js
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  YEAR_CONFIG,
  SUBJECT_COLORS,
  MATERIAS_ANUALES,
} from "../utils/constants";

// Hook: useHorariosData
// Carga los datos de horarios según el año seleccionado.
// Devuelve: { selectedYear, setSelectedYear, subjects, schedules, loading }
//
// Proceso:
// 1. Obtiene la URL del año desde YEAR_CONFIG
// 2. Hace fetch del JSON con materias y horarios
// 3. Procesa horarios a objetos Date para el calendario
// 4. Evita duplicados en materias anuales

export function useHorariosData() {
  const [selectedYear, setSelectedYear] = useState(1);
  const [subjects, setSubjects] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setSubjects([]);
    setSchedules([]);

    const url = YEAR_CONFIG[selectedYear]?.url;
    if (!url) return;

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("Error al cargar");
        return r.json();
      })
      .then(({ referencias, horarios }) => {
        // Procesar materias a lista de opciones visuales
        const materiasList = Object.entries(referencias.materias).map(
          ([codigo, nombre]) => ({
            id: codigo,
            name: nombre,
            color: SUBJECT_COLORS[codigo] || "#999",
          })
        );

        // Procesar horarios: convertir strings de tiempo a objetos Date
        const lunesActual = dayjs().day(1).toDate();
        const yaProcessados = new Set();
        const eventosList = [];

        horarios.forEach(
          ([comision, materia, _, dia_id, __, inicio, fin], idx) => {
            // Evitar duplicados en materias anuales
            const clave = `${materia}-${comision}-${dia_id}-${inicio}`;
            if (MATERIAS_ANUALES.includes(materia)) {
              if (yaProcessados.has(clave)) return;
              yaProcessados.add(clave);
            }

            // Convertir horas ("08:00") a números
            const [horaInicio, minInicio] = inicio.split(":").map(Number);
            const [horaFin, minFin] = fin.split(":").map(Number);

            // Crear fechas con base en el lunes actual
            const fecha = new Date(lunesActual);
            fecha.setDate(lunesActual.getDate() + (dia_id - 1));

            const fechaInicio = new Date(fecha);
            fechaInicio.setHours(horaInicio, minInicio, 0);

            const fechaFin = new Date(fecha);
            fechaFin.setHours(horaFin, minFin, 0);

            eventosList.push({
              id: `${materia}-${comision}-${dia_id}-${inicio}-${fin}-${idx}`,
              title: `${referencias.materias[materia]} (${comision})`,
              start: fechaInicio,
              end: fechaFin,
              materia,
              comision,
            });
          }
        );

        setSubjects(materiasList);
        setSchedules(eventosList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar horarios:", err);
        setLoading(false);
      });
  }, [selectedYear]);

  return { selectedYear, setSelectedYear, subjects, schedules, loading };
}
