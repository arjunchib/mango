export function jsxDEV(...args) {
  const [tag, props] = args;
  return new tag(props).render();
}

export { Fragment } from "./lib/components/fragment";
