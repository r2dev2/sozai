const sozaiPalleteColors = new Set([
  'primary',
  'secondary',
  'error',
  'success',
  'alert',
]);

// uses array spread to foil eslint formatting into vertical line
const materialPalleteColors = new Set([
  ...['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue'],
  ...['cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber'],
  ...['orange', 'deep-orange', 'brown'],
]);

/** @type {(color: string) => string} */
export const getColor = (color) => {
  if (sozaiPalleteColors.has(color)) {
    return `var(--${color}-color)`;
  }
  if (materialPalleteColors.has(color)) {
    return `var(--${color})`;
  }
  return color;
};
