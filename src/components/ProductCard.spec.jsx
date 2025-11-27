import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import ProductCard from './ProductCard.jsx';

describe('ProductCard', () => {
  it('llama a onAdd al hacer click en Agregar', () => {
    const product = { id: 1, name: 'Kit', price: 1000, description: 'Desc' };
    const onAdd = jasmine.createSpy('onAdd');
    const container = document.createElement('div');

    ReactDOM.render(<ProductCard product={product} onAdd={onAdd} />, container);
    const button = container.querySelector('button');
    TestUtils.Simulate.click(button);

    expect(onAdd).toHaveBeenCalledWith(product);
  });
});
