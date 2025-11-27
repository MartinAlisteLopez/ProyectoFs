import React from 'react';
import ReactDOM from 'react-dom';
import CheckoutForm from '../CheckoutForm';
import TestUtils from 'react-dom/test-utils';

describe('CheckoutForm validation', function() {
  let container;
  beforeEach(function() {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(function() {
    document.body.removeChild(container);
    container = null;
  });

  it('muestra errores cuando no hay campos y no hay servicios', function() {
    ReactDOM.render(<CheckoutForm onSubmit={() => {}} items={[]} />, container);
    const form = container.querySelector('form');
    // Disparar submit y esperar la actualización de estado
    TestUtils.Simulate.submit(form);
    // esperar al siguiente tick para que React aplique el setState
    // Usar un pequeño retardo antes de comprobar el DOM
    return new Promise(resolve => setTimeout(resolve, 0)).then(() => {
      const alert = container.querySelector('.alert-danger');
      expect(alert).not.toBeNull();
    });
  });
});
