// Cada materia tiene: número, código, nombre, año, cuatrimestre, prerequisitos
// Los prerequisitos pueden ser de tipo 'R' (Regular) o 'A' (Aprobado)
export const materias = [
  // ============================================
  // MATERIAS DEL PLAN PRINCIPAL (1er a 5to año)
  // ============================================

  {
    numero: 1,
    codigo: '101',
    nombre: 'Análisis Matemático I',
    anio: 1,
    cuatrimestre: 0, // Anual
    prerequisitos: [],
  },
  {
    numero: 2,
    codigo: '102',
    nombre: 'Álgebra y Geometría Analítica',
    anio: 1,
    cuatrimestre: 0, // Anual
    prerequisitos: [],
  },
  {
    numero: 3,
    codigo: '103',
    nombre: 'Física I',
    anio: 1,
    cuatrimestre: 0, // Anual
    prerequisitos: [],
  },
  {
    numero: 4,
    codigo: '104',
    nombre: 'Inglés I',
    anio: 1,
    cuatrimestre: 0, // Anual
    prerequisitos: [],
  },
  {
    numero: 5,
    codigo: '105',
    nombre: 'Lógica y Estructuras Discretas',
    anio: 1,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [],
  },
  {
    numero: 6,
    codigo: '106',
    nombre: 'Algoritmos y Estructuras de Datos',
    anio: 1,
    cuatrimestre: 0, // Anual
    prerequisitos: [],
  },
  {
    numero: 7,
    codigo: '107',
    nombre: 'Arquitectura de Computadoras',
    anio: 1,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [],
  },
  {
    numero: 8,
    codigo: '108',
    nombre: 'Sistemas y Procesos de Negocio',
    anio: 1,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [],
  },

  // Segundo año
  {
    numero: 9,
    codigo: '201',
    nombre: 'Análisis Matemático II',
    anio: 2,
    cuatrimestre: 0, // Anual
    prerequisitos: [
      { numero: 1, tipo: 'R' },
      { numero: 2, tipo: 'R' },
    ],
  },
  {
    numero: 10,
    codigo: '202',
    nombre: 'Física II',
    anio: 2,
    cuatrimestre: 0, // Anual
    prerequisitos: [
      { numero: 1, tipo: 'R' },
      { numero: 3, tipo: 'R' },
    ],
  },
  {
    numero: 11,
    codigo: '203',
    nombre: 'Ingeniería y Sociedad',
    anio: 2,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [],
  },
  {
    numero: 12,
    codigo: '204',
    nombre: 'Inglés II',
    anio: 2,
    cuatrimestre: 0, // Anual
    prerequisitos: [
      { numero: 4, tipo: 'R' },
    ],
  },
  {
    numero: 13,
    codigo: '205',
    nombre: 'Sintaxis y Semántica de los Lenguajes',
    anio: 2,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [
      { numero: 5, tipo: 'R' },
      { numero: 6, tipo: 'R' },
    ],
  },
  {
    numero: 14,
    codigo: '206',
    nombre: 'Paradigmas de Programación',
    anio: 2,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [
      { numero: 5, tipo: 'R' },
      { numero: 6, tipo: 'R' },
    ],
  },
  {
    numero: 15,
    codigo: '207',
    nombre: 'Sistemas Operativos',
    anio: 2,
    cuatrimestre: 0, // Anual
    prerequisitos: [
      { numero: 7, tipo: 'R' },
    ],
  },
  {
    numero: 16,
    codigo: '208',
    nombre: 'Análisis de Sistemas de Información',
    anio: 2,
    cuatrimestre: 0, // Anual
    prerequisitos: [
      { numero: 6, tipo: 'R' },
      { numero: 8, tipo: 'R' },
    ],
  },

  // Tercer año
  {
    numero: 17,
    codigo: '301',
    nombre: 'Probabilidad y Estadística',
    anio: 3,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [
      { numero: 1, tipo: 'R' },
      { numero: 2, tipo: 'R' },
    ],
  },
  {
    numero: 18,
    codigo: '302',
    nombre: 'Economía',
    anio: 3,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [
      { numero: 1, tipo: 'A' },
      { numero: 2, tipo: 'A' },
    ],
  },
  {
    numero: 19,
    codigo: '303',
    nombre: 'Bases de Datos',
    anio: 3,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [
      { numero: 13, tipo: 'R' },
      { numero: 16, tipo: 'R' },
      { numero: 5, tipo: 'A' },
      { numero: 6, tipo: 'A' },
    ],
  },
  {
    numero: 20,
    codigo: '304',
    nombre: 'Desarrollo de Software',
    anio: 3,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [
      { numero: 14, tipo: 'R' },
      { numero: 16, tipo: 'R' },
      { numero: 5, tipo: 'A' },
      { numero: 6, tipo: 'A' },
    ],
  },
  {
    numero: 21,
    codigo: '305',
    nombre: 'Comunicación de Datos',
    anio: 3,
    cuatrimestre: 0, // Anual
    prerequisitos: [
      { numero: 3, tipo: 'A' },
      { numero: 7, tipo: 'A' },
    ],
  },
  {
    numero: 22,
    codigo: '306',
    nombre: 'Análisis Numérico',
    anio: 3,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [
      { numero: 9, tipo: 'R' },
      { numero: 1, tipo: 'A' },
      { numero: 2, tipo: 'A' },
    ],
  },
  {
    numero: 23,
    codigo: '307',
    nombre: 'Diseño de Sistemas de Información',
    anio: 3,
    cuatrimestre: 0, // Anual
    prerequisitos: [
      { numero: 14, tipo: 'R' },
      { numero: 16, tipo: 'R' },
      { numero: 4, tipo: 'A' },
      { numero: 6, tipo: 'A' },
      { numero: 8, tipo: 'A' },
    ],
  },

  // Cuarto año
  {
    numero: 24,
    codigo: '401',
    nombre: 'Legislación',
    anio: 4,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [
      { numero: 11, tipo: 'R' },
    ],
  },
  {
    numero: 25,
    codigo: '402',
    nombre: 'Ingeniería y Calidad de Software',
    anio: 4,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [
      { numero: 19, tipo: 'R' },
      { numero: 20, tipo: 'R' },
      { numero: 23, tipo: 'R' },
      { numero: 13, tipo: 'A' },
      { numero: 14, tipo: 'A' },
    ],
  },
  {
    numero: 26,
    codigo: '403',
    nombre: 'Redes de Datos',
    anio: 4,
    cuatrimestre: 0, // Anual
    prerequisitos: [
      { numero: 15, tipo: 'R' },
      { numero: 21, tipo: 'R' },
    ],
  },
  {
    numero: 27,
    codigo: '404',
    nombre: 'Investigación Operativa',
    anio: 4,
    cuatrimestre: 0, // Anual
    prerequisitos: [
      { numero: 17, tipo: 'R' },
      { numero: 22, tipo: 'R' },
    ],
  },
  {
    numero: 28,
    codigo: '405',
    nombre: 'Simulación',
    anio: 4,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [
      { numero: 17, tipo: 'R' },
      { numero: 9, tipo: 'A' },
    ],
  },
  {
    numero: 29,
    codigo: '406',
    nombre: 'Tecnologías para la Automatización',
    anio: 4,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [
      { numero: 10, tipo: 'R' },
      { numero: 22, tipo: 'R' },
      { numero: 9, tipo: 'A' },
    ],
  },
  {
    numero: 30,
    codigo: '407',
    nombre: 'Administración de Sistemas de Información',
    anio: 4,
    cuatrimestre: 0, // Anual
    prerequisitos: [
      { numero: 18, tipo: 'R' },
      { numero: 23, tipo: 'R' },
      { numero: 16, tipo: 'A' },
    ],
  },

  // Quinto año
  {
    numero: 32,
    codigo: '501',
    nombre: 'Inteligencia Artificial',
    anio: 5,
    cuatrimestre: 0, // Anual
    prerequisitos: [
      { numero: 28, tipo: 'R' },
      { numero: 17, tipo: 'A' },
      { numero: 22, tipo: 'A' },
    ],
  },
  {
    numero: 33,
    codigo: '502',
    nombre: 'Ciencia de Datos',
    anio: 5,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [
      { numero: 28, tipo: 'R' },
      { numero: 17, tipo: 'A' },
      { numero: 19, tipo: 'A' },
    ],
  },
  {
    numero: 34,
    codigo: '503',
    nombre: 'Sistemas de Gestión',
    anio: 5,
    cuatrimestre: 0, // Anual
    prerequisitos: [
      { numero: 18, tipo: 'R' },
      { numero: 27, tipo: 'R' },
      { numero: 23, tipo: 'A' },
    ],
  },
  {
    numero: 35,
    codigo: '504',
    nombre: 'Gestión Gerencial',
    anio: 5,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [
      { numero: 24, tipo: 'R' },
      { numero: 30, tipo: 'R' },
      { numero: 18, tipo: 'A' },
    ],
  },
  {
    numero: 36,
    codigo: '505',
    nombre: 'Seguridad en los Sistemas de Información',
    anio: 5,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [
      { numero: 26, tipo: 'R' },
      { numero: 30, tipo: 'R' },
      { numero: 20, tipo: 'A' },
      { numero: 21, tipo: 'A' },
    ],
  },
  {
    numero: 37,
    codigo: '506',
    nombre: 'Proyecto Final',
    anio: 5,
    cuatrimestre: 0, // Anual
    prerequisitos: [
      { numero: 25, tipo: 'R' },
      { numero: 26, tipo: 'R' },
      { numero: 30, tipo: 'R' },
      { numero: 12, tipo: 'A' },
      { numero: 20, tipo: 'A' },
      { numero: 23, tipo: 'A' },
    ],
  },
  {
    numero: 38,
    codigo: '507',
    nombre: 'Práctica Profesional',
    anio: 5,
    cuatrimestre: 1, // cuatrimestral
    prerequisitos: [
      { numero: 25, tipo: 'R' },
      { numero: 26, tipo: 'R' },
      { numero: 30, tipo: 'R' },
      { numero: 12, tipo: 'A' },
      { numero: 20, tipo: 'A' },
      { numero: 23, tipo: 'A' },
    ],
  },

  // ============================================
  // MATERIAS EXTRA (Seminarios y complementarias)
  // ============================================
  {
    numero: 101,
    codigo: '308',
    nombre: 'Seminario Integrador',
    anio: 3,
    cuatrimestre: 1,
    extra: true,
    prerequisitos: [
      { numero: 16, tipo: 'R' },
      { numero: 6, tipo: 'A' },
      { numero: 8, tipo: 'A' },
      { numero: 13, tipo: 'A' },
      { numero: 14, tipo: 'A' },
    ],
  },
  {
    numero: 102,
    codigo: 'SRE',
    nombre: 'Sistemas de Representación',
    anio: 1,
    cuatrimestre: 1,
    extra: true,
    puntos: 3,
    prerequisitos: [],
  },
  {
    numero: 103,
    codigo: 'QUI',
    nombre: 'Química',
    anio: 1,
    cuatrimestre: 1,
    extra: true,
    puntos: 2,
    prerequisitos: [],
  },

  // ============================================
  // MATERIAS ELECTIVAS (Solo 1 cuatrimestre)
  // ============================================
  {
    numero: 201,
    codigo: '333',
    nombre: 'Backend de Aplicaciones',
    anio: 3,
    cuatrimestre: 1,
    electiva: true,
    puntos: 3,
    prerequisitos: [
      { numero: 14, tipo: 'R' },
      { numero: 13, tipo: 'R' },
      { numero: 6, tipo: 'A' },
    ],
  },
  {
    numero: 31,
    codigo: '431',
    nombre: 'Comunicación Multimedial',
    anio: 4,
    cuatrimestre: 1,
    electiva: true,
    puntos: 3,
    prerequisitos: [
      { numero: 19, tipo: 'R' },
      { numero: 8, tipo: 'A' },
      { numero: 16, tipo: 'A' },
    ],
  },
  {
    numero: 202,
    codigo: '428',
    nombre: 'Product Owner',
    anio: 4,
    cuatrimestre: 1,
    electiva: true,
    puntos: 2,
    prerequisitos: [
      { numero: 23, tipo: 'R' },
      { numero: 16, tipo: 'A' },
    ],
  },
  {
    numero: 203,
    codigo: '430',
    nombre: 'Arquitectura de Software',
    anio: 4,
    cuatrimestre: 1,
    electiva: true,
    puntos: 3,
    prerequisitos: [
      { numero: 19, tipo: 'R' },
      { numero: 20, tipo: 'R' },
      { numero: 14, tipo: 'A' },
      { numero: 13, tipo: 'A' },
    ],
  },
  {
    numero: 204,
    codigo: '432',
    nombre: 'Desarrollo de Aplicaciones con Objetos',
    anio: 4,
    cuatrimestre: 1,
    electiva: true,
    puntos: 2,
    prerequisitos: [
      { numero: 13, tipo: 'R' },
      { numero: 6, tipo: 'A' },
    ],
  },
  {
    numero: 205,
    codigo: '433',
    nombre: 'DevOps',
    anio: 4,
    cuatrimestre: 1,
    electiva: true,
    puntos: 3,
    prerequisitos: [
      { numero: 19, tipo: 'R' },
      { numero: 20, tipo: 'R' },
      { numero: 23, tipo: 'R' },
      { numero: 14, tipo: 'A' },
      { numero: 13, tipo: 'A' },
    ],
  },
  {
    numero: 206,
    codigo: '434',
    nombre: 'Mejora de Procesos',
    anio: 4,
    cuatrimestre: 1,
    electiva: true,
    puntos: 2,
    prerequisitos: [
      { numero: 19, tipo: 'R' },
      { numero: 8, tipo: 'A' },
      { numero: 16, tipo: 'A' },
    ],
  },
  {
    numero: 207,
    codigo: '435',
    nombre: 'Gestión Industrial',
    anio: 4,
    cuatrimestre: 1,
    electiva: true,
    puntos: 2,
    prerequisitos: [
      { numero: 19, tipo: 'R' },
      { numero: 8, tipo: 'A' },
      { numero: 16, tipo: 'A' },
    ],
  },
  {
    numero: 208,
    codigo: '472',
    nombre: 'Experiencia de Usuario',
    anio: 4,
    cuatrimestre: 1,
    electiva: true,
    puntos: 2,
    prerequisitos: [
      { numero: 23, tipo: 'R' },
    ],
  },
  {
    numero: 209,
    codigo: '546',
    nombre: 'Auditoría SI/TI',
    anio: 5,
    cuatrimestre: 1,
    electiva: true,
    puntos: 3,
    prerequisitos: [
      { numero: 30, tipo: 'R' },
      { numero: 20, tipo: 'A' },
    ],
  },
  {
    numero: 210,
    codigo: '547',
    nombre: 'Consultoría Digital',
    anio: 5,
    cuatrimestre: 1,
    electiva: true,
    puntos: 3,
    prerequisitos: [
      { numero: 30, tipo: 'R' },
      { numero: 20, tipo: 'A' },
    ],
  },
  {
    numero: 211,
    codigo: '548',
    nombre: 'Creatividad e Innovación',
    anio: 5,
    cuatrimestre: 1,
    electiva: true,
    puntos: 2,
    prerequisitos: [
      { numero: 30, tipo: 'R' },
      { numero: 20, tipo: 'A' },
    ],
  },
  {
    numero: 212,
    codigo: '549',
    nombre: 'Blockchain',
    anio: 5,
    cuatrimestre: 1,
    electiva: true,
    puntos: 3,
    prerequisitos: [
      { numero: 26, tipo: 'R' },
      { numero: 19, tipo: 'R' },
      { numero: 14, tipo: 'A' },
      { numero: 20, tipo: 'A' },
    ],
  },
  {
    numero: 213,
    codigo: '550',
    nombre: 'Testing de Software',
    anio: 5,
    cuatrimestre: 1,
    electiva: true,
    puntos: 2,
    prerequisitos: [
      { numero: 25, tipo: 'R' },
      { numero: 19, tipo: 'A' },
      { numero: 20, tipo: 'A' },
    ],
  },
  {
    numero: 214,
    codigo: '551',
    nombre: 'Decisiones Complejas',
    anio: 5,
    cuatrimestre: 1,
    electiva: true,
    puntos: 2,
    prerequisitos: [
      { numero: 27, tipo: 'R' },
      { numero: 19, tipo: 'A' },
    ],
  },
  {
    numero: 215,
    codigo: '552',
    nombre: 'Emprendimientos Tec.',
    anio: 5,
    cuatrimestre: 1,
    electiva: true,
    puntos: 2,
    prerequisitos: [
      { numero: 30, tipo: 'R' },
      { numero: 16, tipo: 'A' },
      { numero: 19, tipo: 'A' },
    ],
  },
  {
    numero: 216,
    codigo: '553',
    nombre: 'Gerenciamiento Estratégico',
    anio: 5,
    cuatrimestre: 1,
    electiva: true,
    puntos: 3,
    prerequisitos: [
      { numero: 30, tipo: 'R' },
      { numero: 20, tipo: 'A' },
    ],
  },
  {
    numero: 217,
    codigo: '554',
    nombre: 'Green Software',
    anio: 5,
    cuatrimestre: 1,
    electiva: true,
    puntos: 2,
    prerequisitos: [
      { numero: 20, tipo: 'R' },
      { numero: 19, tipo: 'R' },
      { numero: 14, tipo: 'A' },
      { numero: 13, tipo: 'A' },
    ],
  },
  {
    numero: 218,
    codigo: '555',
    nombre: 'Software de Fuentes Abiertas',
    anio: 5,
    cuatrimestre: 1,
    electiva: true,
    puntos: 3,
    prerequisitos: [
      { numero: 19, tipo: 'R' },
      { numero: 20, tipo: 'R' },
      { numero: 26, tipo: 'R' },
      { numero: 13, tipo: 'A' },
      { numero: 14, tipo: 'A' },
    ],
  },
  {
    numero: 219,
    codigo: '556',
    nombre: 'Seguridad en Desarrollo',
    anio: 5,
    cuatrimestre: 1,
    electiva: true,
    puntos: 2,
    prerequisitos: [
      { numero: 19, tipo: 'R' },
      { numero: 20, tipo: 'R' },
      { numero: 23, tipo: 'R' },
      { numero: 8, tipo: 'A' },
      { numero: 15, tipo: 'A' },
    ],
  },
  {
    numero: 220,
    codigo: '557',
    nombre: 'Integración Web',
    anio: 5,
    cuatrimestre: 1,
    electiva: true,
    puntos: 2,
    prerequisitos: [
      { numero: 26, tipo: 'R' },
      { numero: 19, tipo: 'A' },
      { numero: 20, tipo: 'A' },
    ],
  },
  {
    numero: 221,
    codigo: '611',
    nombre: 'Habilidades Blandas',
    anio: 5,
    cuatrimestre: 1,
    electiva: true,
    puntos: 2,
    prerequisitos: [
      { numero: 30, tipo: 'R' },
    ],
  },
  {
    numero: 222,
    codigo: '633',
    nombre: 'Entornos Virtuales',
    anio: 5,
    cuatrimestre: 1,
    electiva: true,
    puntos: 2,
    prerequisitos: [
      { numero: 23, tipo: 'R' },
      { numero: 20, tipo: 'A' },
    ],
  }
];