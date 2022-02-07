<script context="module">
  let amountCreated = 0;
</script>

<script>
  import { radioKey } from 'src/js/constants';
  import { group } from 'src/js/group';

  import { createEventDispatcher, onMount, setContext } from 'svelte';

  import { writable } from 'svelte/store';

  /** @type {number | null} */
  export let selected = null;
  export let name = '';

  /** @type {HTMLElement | undefined}*/
  let div;

  const nameStore = writable(name);
  setContext(radioKey, { name: nameStore });

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

  $: nameStore.set(name);

  onMount(() => {
    if (!div) return;
    const { destroy } = group(
      radioKey,
      div,
      writable(true),
      writable(false),
      indexesSelected
    );

    return () => {
      destroy();
    };
  });
</script>

<div bind:this={div} class="s-component s-radiogroup" role="radiogroup">
  <slot />
</div>
