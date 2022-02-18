<script>
  import { group } from '../../js/group.js';

  import { onMount, setContext } from 'svelte';

  import { writable } from 'svelte/store';

  export let key = Symbol();

  export let selected = writable(/** @type {number[]}*/ ([]));
  export let name = '';

  let klass = '';
  export { klass as class };
  export let role = '';
  export let multiselect = writable(false);

  /** @type {HTMLElement | undefined}*/
  let div;

  const nameStore = writable(name);
  setContext(key, { name: nameStore });

  $: nameStore.set(name);

  onMount(() => {
    if (!div) return;
    const { destroy } = group(key, div, writable(true), multiselect, selected);

    return () => {
      destroy();
    };
  });
</script>

<div bind:this={div} class="s-component {klass}" {role}>
  <slot />
</div>
