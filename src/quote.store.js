/**
 * Maneja la selección de productos para generar una “factura/contrato”.
 * Almacena en sessionStorage.
 */
const QUOTE_KEY = 'stroms-quote-v1';

function readQuote() {
  try {
    const raw = sessionStorage.getItem(QUOTE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeQuote(items) {
  sessionStorage.setItem(QUOTE_KEY, JSON.stringify(items));
}

export const QuoteStore = {
  setItems(items) {
    writeQuote(items);
  },
  getItems() {
    return readQuote();
  },
  clear() {
    writeQuote([]);
  }
};
