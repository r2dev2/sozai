import { SvelteComponentTyped } from 'svelte';

export type CheckboxGroupProps = {
  selected?: number[];
  name?: string;
};

export default class RadioGroup extends SvelteComponentTyped<
  CheckboxGroupProps,
  { change: CustomEvent<{ selected: number[] }> }
> {}
