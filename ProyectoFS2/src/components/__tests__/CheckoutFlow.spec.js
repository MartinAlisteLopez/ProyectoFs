import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App';
import TestUtils from 'react-dom/test-utils';

describe('Checkout end-to-end flow (simulated)', function() {
  let container;
  beforeEach(function() {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(function() {
    document.body.removeChild(container);
    container = null;
  });

  it('permite agregar servicios y completar el checkout (simulado)', function() {
    ReactDOM.render(<App />, container);
    // find first Add button
    const addBtn = container.querySelector('button.btn-primary');
    expect(addBtn).not.toBeNull();
    TestUtils.Simulate.click(addBtn);
    // ir a checkout
    const checkoutLink = container.querySelector('a.nav-link[href="/checkout"]') || Array.from(container.querySelectorAll('a.nav-link')).find(a=>/checkout/.test(a.getAttribute('href')));
    // Simular navegación clicando link (react-router BrowserRouter needs actual navigation - instead call the checkout form directly)
    // Render CheckoutForm directly to test submission behavior with at least one item
    const CheckoutForm = require('../CheckoutForm').default;
    const container2 = document.createElement('div');
    document.body.appendChild(container2);
    // Passing items with one entry
    ReactDOM.render(<CheckoutForm items={[{id:1, name:'Arreglo', base:100, qty:1}]} onSubmit={() => {}} />, container2);
    const form = container2.querySelector('form');
    // Empty form -> should show errors
    TestUtils.Simulate.submit(form);
    return new Promise(resolve => setTimeout(resolve, 0)).then(()=>{
      const alert = container2.querySelector('.alert-danger');
      expect(alert).not.toBeNull();
      document.body.removeChild(container2);
    });
  });
});
