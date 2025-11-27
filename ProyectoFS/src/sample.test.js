describe('sample module', () => {
  it('suma debe sumar dos números correctamente', () => {
    expect(suma(2, 3)).toBe(5);
    expect(suma(-1, 1)).toBe(0);
  });

  it('esPar debe identificar pares e impares', () => {
    expect(esPar(4)).toBeTrue();
    expect(esPar(3)).toBeFalse();
    expect(esPar('hola')).toBeFalse();
  });
});
