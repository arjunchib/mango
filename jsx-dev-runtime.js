export function jsxDEV(...args) {
  const [tag, props] = args;
  return new tag(props).render();
}
