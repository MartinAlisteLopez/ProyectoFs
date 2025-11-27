import React from 'react';
import ReactDOM from 'react-dom';
import ServiceList from '../ServiceList';
import TestUtils from 'react-dom/test-utils';

describe('ServiceList', function() {
  let container;
  beforeEach(function() {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(function() {
    document.body.removeChild(container);
    container = null;
  });

  it('invoca onAdd cuando se hace click en un servicio', function() {
    const onAdd = jasmine.createSpy('onAdd');
    ReactDOM.render(<ServiceList onAdd={onAdd} />, container);
    const btn = container.querySelector('button');
    TestUtils.Simulate.click(btn);
    expect(onAdd).toHaveBeenCalled();
  });
});
