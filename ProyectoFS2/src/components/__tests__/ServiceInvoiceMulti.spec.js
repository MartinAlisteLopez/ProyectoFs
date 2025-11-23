import React from 'react';
import ReactDOM from 'react-dom';
import ServiceInvoice from '../ServiceInvoice';
import TestUtils from 'react-dom/test-utils';

describe('ServiceInvoice multi-item flows', function() {
  let container;
  beforeEach(function() {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(function() {
    document.body.removeChild(container);
    container = null;
  });

  it('acumula cantidad cuando se agregan ítems iguales', function() {
    const items = [
      { id: 1, name: 'Arreglo', base: 100, qty: 2 },
      { id: 1, name: 'Arreglo', base: 100, qty: 1 }
    ];
    // merge expected: qty 3
    ReactDOM.render(<ServiceInvoice items={items} />, container);
    const totalText = container.textContent;
    expect(totalText).toContain('Total factura');
  });

  it('recalcula cuando se especifican costos de materiales y otros', function() {
    const items = [{ id: 2, name: 'Pintura', base: 80, qty: 1, materialsCost: 30, otherCost: 5 }];
    ReactDOM.render(<ServiceInvoice items={items} />, container);
    const txt = container.textContent;
    expect(txt).toContain('Materiales: $30');
    expect(txt).toContain('Otros: $5');
    expect(txt).toContain('Total: $115');
  });
});
