/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export type ListProps = {
  selectable?: boolean,
  multiselect?: boolean,
  selected?: number[],
};

export default class List extends SvelteComponentTyped<
  ListProps,
  { change: CustomEvent<{ selected: number[] }> },
  { default: {} }
> {}