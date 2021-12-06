<script>
  import { onMount } from 'svelte';
  import { get_current_component } from 'svelte/internal';

  import { forwardEventsBuilder } from '../../js/forwardEvents.js';
  import { getColor } from '../../js/utils.js';

  export let value = '';
  export let color = 'primary';
  export let label = '';
  export let placeholder = '';
  export let outlined = false;
  export let hint = '';
  /** @type {string | boolean} */
  export let error = false;
  export let append = '';
  export let prepend = '';
  export let persistentHint = false;
  export let textarea = false;
  export let rows = 6;
  export let select = false;
  export let autocomplete = false;
  export let noUnderline = false;
  export let appendReverse = false;
  export let prependReverse = false;
  export let bgColor = 'white';
  export let disabled = false;
  export let focused = false;

  onMount(() => {
    // TODO implement Label component
    console.warn('Label component has not been implemented yet');
  });

  const toggleFocus = () => {
    focused = !focused;
  };

  const forwardEvents = forwardEventsBuilder(get_current_component());

  $: actualColor = getColor(color);
  $: style = `--color: ${actualColor}`;
</script>

<div>
  {#if (!textarea && !select) || autocomplete}
    <input
      aria-label={label}
      bind:value
      class="s-component s-input"
      class:outlined
      class:error
      {disabled}
      on:focus={toggleFocus}
      on:blur={toggleFocus}
      use:forwardEvents
      placeholder={!value ? placeholder : ''}
    />
  {/if}
</div>

<style>
  div {
    margin: 0.5rem 0 1.5rem 0;
    color: var(--input-text-color);
  }

  .s-input {
    border-radius: 0.25rem 0.25rem 0 0;
    padding: 1.5rem 1rem 0.5rem 1rem;
    width: 100%;

    background-color: var(--input-background-color);
    color: black;
  }
</style>
