// Módulo de ejemplo usado para demostrar pruebas unitarias con Jasmine/Karma
// Módulo de ejemplo usado para demostrar pruebas unitarias con Jasmine/Karma
// Exponer en globalThis para ser compatible con el bundling de webpack
function suma(a, b) {
  return a + b;
}

function esPar(n) {
  return typeof n === 'number' && n % 2 === 0;
}

if (typeof globalThis !== 'undefined') {
  globalThis.suma = suma;
  globalThis.esPar = esPar;
} else if (typeof window !== 'undefined') {
  window.suma = suma;
  window.esPar = esPar;
} else if (typeof global !== 'undefined') {
  global.suma = suma;
  global.esPar = esPar;
}
