<script context="module">
  let amountCreated = 0;
</script>

<script>
  import { checkboxKey } from '../../js/constants.js';
  import RadioCheckboxGroup from '../Util/RadioCheckboxGroup.svelte';

  import { createEventDispatcher } from 'svelte';

  import { writable } from 'svelte/store';

  /** @type {number[]} */
  export let selected = [];
  export let name = '';

  const dispatch = createEventDispatcher();

  const indexesSelected = writable(selected);

  $: if ($indexesSelected !== selected) {
    selected = $indexesSelected;
    dispatch('change', { selected });
  }

  $: if (name === '') {
    name = `s-checkbox-input-${amountCreated++}`;
  }
</script>

<RadioCheckboxGroup
  class="s-checkboxgroup"
  role=""
  key={checkboxKey}
  selected={indexesSelected}
  multiselect={writable(true)}
  {name}
>
  <slot />
</RadioCheckboxGroup>
