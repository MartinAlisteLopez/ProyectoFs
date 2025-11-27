import { DataStore } from './data.store.js';

describe('DataStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('creates and lists products', () => {
    const created = DataStore.create({ name: 'Nuevo', category: 'Test', price: 1000 });
    const all = DataStore.list();
    expect(all.find(p => p.id === created.id).name).toBe('Nuevo');
  });

  it('updates and removes products', () => {
    const p = DataStore.create({ name: 'Prod', category: 'Cat', price: 1 });
    DataStore.update(p.id, { price: 99 });
    expect(DataStore.get(p.id).price).toBe(99);
    DataStore.remove(p.id);
    expect(DataStore.get(p.id)).toBeUndefined();
  });

  it('handles cart operations and events', (done) => {
    const p = DataStore.create({ name: 'Prod', category: 'Cat', price: 1 });
    const handler = () => {
      window.removeEventListener('cart:updated', handler);
      expect(DataStore.cartList().length).toBe(1);
      DataStore.cartClear();
      done();
    };
    window.addEventListener('cart:updated', handler);
    DataStore.cartAdd(p.id, 2);
  });
});
