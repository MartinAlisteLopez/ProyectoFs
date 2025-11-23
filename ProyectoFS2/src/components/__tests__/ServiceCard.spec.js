import React from 'react';
import ReactDOM from 'react-dom';
import ServiceCard from '../ServiceCard';
import TestUtils from 'react-dom/test-utils';

describe('ServiceCard', function() {
  let container;
  beforeEach(function() {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(function() {
    document.body.removeChild(container);
    container = null;
  });

  it('llama a onAdd con notas incluidas', function() {
    const service = { id: 99, name: 'Prueba', base: 10 };
    const onAdd = jasmine.createSpy('onAdd');
    ReactDOM.render(<ServiceCard service={service} onAdd={onAdd} />, container);
    const input = container.querySelector('input');
    const btn = container.querySelector('button');
    TestUtils.Simulate.change(input, { target: { value: 'nota de prueba' } });
    TestUtils.Simulate.click(btn);
    expect(onAdd).toHaveBeenCalled();
    const arg = onAdd.calls.mostRecent().args[0];
    expect(arg.notes).toBe('nota de prueba');
    expect(arg.id).toBe(service.id);
  });
});
