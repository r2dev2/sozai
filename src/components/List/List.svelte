<script>
  import { createEventDispatcher, onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { listKey } from '../../js/constants.js';
  import { group } from '../../js/group.js';

  export let selectable = false;
  export let multiselect = false;
  export let selected = [0].slice(1);

  const dispatch = createEventDispatcher();

  /** @type {Element | undefined}*/
  let ul;

  const isSelectable = writable(selectable);
  const isMultiselect = writable(multiselect);
  const indexesSelected = writable(selected);

  setContext(listKey, { selectable: isSelectable });

  $: isSelectable.set(selectable);
  $: isMultiselect.set(multiselect);
  $: indexesSelected.set(selected);
  $: if ($indexesSelected !== selected) {
    selected = $indexesSelected;
    dispatch('change', { selected });
  }

  onMount(() => {
    if (!ul) return;
    const { destroy } = group(
      listKey,
      ul,
      isSelectable,
      isMultiselect,
      indexesSelected
    );

    return () => {
      destroy();
    };
  });
</script>

<ul bind:this={ul} class="s-component s-list">
  <slot />
</ul>

<style>
  .s-list {
    text-align: left;
  }
</style>
