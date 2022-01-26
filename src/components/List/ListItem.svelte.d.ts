/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export type ListItemProps = {
  color?: string,
  icon?: string,
  selected?: boolean,
};

export default class ListItem extends SvelteComponentTyped<
  ListItemProps,
  WindowEventMap,
  { default: {} }
> {}