export function jsx(...args) {
  const [tag, props] = args;
  return new tag(props).render();
}

export { jsx as jsxs };

export { Fragment } from "./lib/components/fragment";
