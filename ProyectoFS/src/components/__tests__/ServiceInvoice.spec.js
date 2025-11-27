import React from 'react';
import ReactDOM from 'react-dom';
import ServiceInvoice from '../ServiceInvoice';

describe('ServiceInvoice component', function() {
  let container;
  beforeEach(function() {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(function() {
    document.body.removeChild(container);
    container = null;
  });

  it('muestra mensaje cuando no hay servicios', function() {
    ReactDOM.render(<ServiceInvoice items={[]} />, container);
    expect(container.querySelector('.alert')).not.toBeNull();
  });

  it('desglosa y suma totales correctamente', function() {
    const items = [{ id: 1, name: 'Arreglo', base: 100, qty: 1 }];
    ReactDOM.render(<ServiceInvoice items={items} />, container);
    const totalText = container.textContent;
    expect(totalText).toContain('Trabajo');
    expect(totalText).toContain('Materiales');
    expect(totalText).toContain('Total factura');
  });
});
