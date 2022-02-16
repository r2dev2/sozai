import { SvelteComponentTyped } from 'svelte';

export type RadioGroupProps = {
  selected?: number | null;
  name?: string;
};

export default class RadioGroup extends SvelteComponentTyped<
  RadioGroupProps,
  { change: CustomEvent<{ selected: number | null }> }
> {}
