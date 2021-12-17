<script>
  import { onMount } from 'svelte';
  import { get_current_component } from 'svelte/internal';

  import { forwardEventsBuilder } from '../../js/forwardEvents.js';
  import { getColor } from '../../js/utils.js';

  import Label from './Label.svelte';
  import Hint from './Hint.svelte';
  import Underline from './Underline.svelte';

  export let value = '';
  export let color = 'primary';
  export let label = '';
  export let placeholder = '';
  export let outlined = false;
  export let hint = '';
  export let error = '';
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
  export let dense = false;

  onMount(() => {
    // TODO implement Label component
    console.warn('Label component has not been implemented yet');
  });

  const toggleFocus = () => {
    focused = !focused;
  };

  const forwardEvents = forwardEventsBuilder(get_current_component());

  $: showHint = error || (persistentHint ? hint : focused && hint);
  $: labelOnTop = placeholder || focused || (value || value === 0);
  $: actualColor = getColor(color);
  $: style = `--color: ${actualColor}`;
</script>

<div class="s-component s-input-container" {style}>
  {#if label}
    <slot name="label">
      <Label
        {labelOnTop}
        {focused}
        {error}
        {outlined}
        {prepend}
        {color}
        {bgColor}
        dense={dense && !outlined}
      >
        {label}
      </Label>
    </slot>
  {/if}

  {#if (!textarea && !select) || autocomplete}
    <input
      aria-label={label}
      bind:value
      class="s-input"
      class:outlined
      class:error
      {disabled}
      on:focus={toggleFocus}
      on:blur={toggleFocus}
      use:forwardEvents
      placeholder={!value ? placeholder : ''}
    />
  {/if}

  <Underline
    {noUnderline}
    {outlined}
    {focused}
    {error}
    {color}
  />

  {#if showHint}
    <Hint {error} {hint} />
  {/if}
</div>

<style>
  div {
    position: relative;
    margin: 0.5rem 0 1.5rem 0;
    color: var(--input-text-color);
  }

  .s-input {
    border-radius: 0.25rem 0.25rem 0 0;
    padding: 1.5rem 0.75rem 0.625rem 0.75rem;
    margin-bottom: 0px;
    box-sizing: border-box;
    width: 100%;

    background-color: var(--input-bg-color);
    caret-color: var(--color);
    color: black;

    border: 0;

    font-size: 100%;
  }

  .s-input:focus {
    background-color: var(--input-bg-focus-color);
    outline: none;
  }

  .s-input.error {
    caret-color: var(--error-color);
  }

  .s-input.outlined {
    padding: 1rem 0.75rem;
    border: var(--outlined-border-color) 1px solid;
    border-radius: var(--border-radius-rounded);
    background-color: #00000000;
    transition: ease-in var(--transition-duration);
  }

  .s-input.outlined:focus {
    border-color: var(--color);
  }
</style>
