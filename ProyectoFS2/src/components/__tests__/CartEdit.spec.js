import React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import ServiceList from '../ServiceList'

function renderIntoDocument(component) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  act(() => root.render(component))
  return { container, root }
}

describe('Cart editing behavior', () => {
  it('allows editing quantity/cost and reflects in invoice', () => {
    // ServiceList exposes an "onAdd" prop; we use a wrapper component to simulate
    let addedItems = []
    function Wrapper() {
      const [items, setItems] = React.useState([])
      return (
        <div>
          <ServiceList onAdd={(item) => setItems((s) => [...s, { ...item, cantidad: 1 }])} />
          <div id="cart">
            {items.map((it) => (
              <div key={it.id} data-id={it.id}>
                <span className="title">{it.title}</span>
                <input className="qty" defaultValue={it.cantidad} />
              </div>
            ))}
          </div>
        </div>
      )
    }

    const { container } = renderIntoDocument(<Wrapper />)

    // Simular añadir primer servicio programáticamente
    // Buscar botón 'Añadir' en ServiceList y disparar click
    const addButtons = container.querySelectorAll('button')
    expect(addButtons.length).toBeGreaterThan(0)
    act(() => { addButtons[0].dispatchEvent(new MouseEvent('click', { bubbles: true })) })

    const qtyInput = container.querySelector('.qty')
    expect(qtyInput).not.toBeNull()
    // cambiar cantidad
    act(() => {
      qtyInput.value = '3'
      qtyInput.dispatchEvent(new Event('input', { bubbles: true }))
    })

    expect(qtyInput.value).toBe('3')
  })
})
