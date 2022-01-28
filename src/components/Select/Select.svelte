<script context="module">
  console.warn('<Select /> is not completed yet');
</script>

<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  import TextField from '../TextField/TextField.svelte';
  import List from '../List/List.svelte';
  import ListItem from '../List/ListItem.svelte';

  export let label = '';
  export let active = false;
  /** @type {number | null} */
  export let value = null;
  export let items = [{ text: 'sample' }].slice(1);

  /** @type {HTMLElement | null}*/
  let selectEl;
  let fadeOutDuration = 300;

  /** @type {(num: number) => void}*/
  const selectValue = num => {
    value = num;
    active = false;
    dispatch('change', { value });
  };

  const dispatch = createEventDispatcher();

  onMount(() => {
    const cssRippleDuration = window.getComputedStyle(selectEl).getPropertyValue('--ripple-duration');
    const numDuration = parseFloat(cssRippleDuration);
    if (!isNaN(numDuration)) return;
    if (cssRippleDuration.endsWith('ms')) {
      fadeOutDuration = numDuration;
    } else if (cssRippleDuration.endsWith('s')) {
      fadeOutDuration = numDuration * 1000;
    }
  });
</script>

<div bind:this={selectEl} class="s-component s-select" class:active>
  <TextField
    value={items[value]?.text ?? ''}
    disabled={active}
    focused={active}
    on:click={() => (active = !active)}
    {label}
  />

  {#if active}
    <div class="options" out:fade={{ delay: fadeOutDuration, duration: 0 }}>
      <List
        selectable
        selected={[value].filter(x => x != null)}
        on:change={e => selectValue(e.detail.selected[0])}
      >
        {#each items as item}
          <ListItem>
            {item.text}
          </ListItem>
        {/each}
      </List>
    </div>
  {/if}
</div>

<style>
  .s-select {
    position: relative;
  }

  .s-select :global(.s-list) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: var(--app-bg-color);
    box-shadow: var(--shadow);
  }

  .s-select :global(.s-listitem) {
    padding: 0.75rem 1rem;
  }

  .s-select :global(.s-input) {
    caret-color: transparent;
  }

  .s-select :global(.s-input:hover) {
    cursor: pointer;
  }
</style>