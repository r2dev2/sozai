/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export type ButtonProps = {
  value?: boolean,
  color?: string,
  outlined?: boolean,
  text?: boolean,
  block?: boolean,
  disabled?: boolean,
  icon?: string,
  small?: boolean,
  dense?: boolean,
  light?: boolean,
  dark?: boolean,
  flat?: boolean,
  klass?: string,
  style?: string,
};

export default class Button extends SvelteComponentTyped<
  ButtonProps,
  WindowEventMap,
  { default: {} }
> {}