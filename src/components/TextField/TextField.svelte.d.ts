import { SvelteComponentTyped } from 'svelte';

export type TextFieldProps = {
  value?: string;
  color?: string;
  label?: string;
  placeholder?: string;
  outlined?: boolean;
  filled?: boolean;
  dense?: boolean;
  hint?: string;
  error?: string;
  prepend?: string;
  persistentHint?: boolean;
  textarea?: boolean;
  rows?: number;
  select?: boolean;
  autocomplete?: boolean;
  noUnderline?: boolean;
  bgColor?: string;
  disabled?: boolean;
  focused?: boolean;
  klass?: string;
  style?: string;
};

export default class Button extends SvelteComponentTyped<
  TextFieldProps,
  WindowEventMap
> {}
