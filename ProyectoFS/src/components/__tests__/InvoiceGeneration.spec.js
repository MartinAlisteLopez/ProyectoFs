import React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import ServiceInvoice from '../ServiceInvoice'

function renderIntoDocument(component) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  act(() => root.render(component))
  return { container, root }
}

describe('Invoice generation with multiple items', () => {
  it('calculates totals correctly for multiple items', () => {
    const items = [
      { id: 1, name: 'Reparación A', base: 100, qty: 1, materialsCost: 20, otherCost: 5 },
      { id: 2, name: 'Instalación B', base: 200, qty: 1, materialsCost: 50, otherCost: 10 },
    ]

    const { container } = renderIntoDocument(
      <ServiceInvoice items={items} onRemove={() => {}} />
    )

    // Buscar totales en el DOM
    const texto = container.textContent
    expect(texto).toContain('Reparación A')
    expect(texto).toContain('Instalación B')
    // Suma item 1 = 125, item2 = 260, total = 385
    expect(texto).toContain('125')
    expect(texto).toContain('260')
    expect(texto).toContain('385')
  })
})
