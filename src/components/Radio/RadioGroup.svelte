<script context="module">
  let amountCreated = 0;
</script>

<script>
  import { radioKey } from '../../js/constants.js';
  import RadioCheckboxGroup from '../Util/RadioCheckboxGroup.svelte';

  import { createEventDispatcher } from 'svelte';

  import { writable } from 'svelte/store';

  /** @type {number | null} */
  export let selected = null;
  export let name = '';

  const dispatch = createEventDispatcher();
  /** @type {(s: number | null) => number[]}*/
  const selectedToIndexesSelected = (s) => (s !== null ? [s] : []);
  /** @type {(s: number[]) => number | null} */
  const indexesSelectedToSelected = (s) => (s.length ? s[0] : null);

  const indexesSelected = writable(selectedToIndexesSelected(selected));
  $: indexesSelected.set(selectedToIndexesSelected(selected));
  $: if (indexesSelectedToSelected($indexesSelected) !== selected) {
    selected = indexesSelectedToSelected($indexesSelected);
    dispatch('change', { selected });
  }

  $: if (name === '') {
    name = `s-radio-input-${amountCreated++}`;
  }
</script>

<RadioCheckboxGroup
  class="s-radiogroup"
  role="radiogroup"
  key={radioKey}
  selected={indexesSelected}
  {name}
>
  <slot />
</RadioCheckboxGroup>
