// Archivo: src/utils/constants.js
// Contiene constantes usadas por los componentes de horarios.
// - SUBJECT_COLORS: mapeo códigoMateria -> color para estilizar eventos
// - MATERIAS_ANUALES: lista de códigos que se tratan como anuales (evitar duplicados)
// - YEAR_CONFIG: configuración por año (etiqueta y URL del JSON de horarios)
export const SUBJECT_COLORS = {
  AMI: "#FF6B6B",
  Algebra: "#4ECDC4",
  AED: "#FFE66D",
  "Fisica I": "#95E1D3",
  LED: "#A8E6CF",
  SPN: "#FFD3B6",
  Ingles: "#FFAAA5",
  ACO: "#FF8B94",
  "Ing y Soc": "#B4A7D6",
};

export const MATERIAS_ANUALES = ["AMI", "Algebra", "AED", "Fisica I", "Ingles"];

export const YEAR_CONFIG = {
  1: { label: "Primer Año", url: "/horariosPrimerAño.json" },
  2: { label: "Segundo Año", url: "/horariosSegundoAño.json" },
  3: { label: "Tercer Año", url: "/horariosTercerAño.json" },
  // Agrega más años aquí si corresponde
};
