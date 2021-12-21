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
  export let filled = false;
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
  export let bgColor = 'var(--app-bg-color)';
  export let disabled = false;
  export let focused = false;
  export let klass = '';
  export let style = '';

  const toggleFocus = () => {
    focused = !focused;
  };

  const forwardEvents = forwardEventsBuilder(get_current_component());

  $: showHint = error || (persistentHint ? hint : focused && hint);
  $: labelOnTop = placeholder || focused || (value || value === 0);
  $: actualColor = getColor(color);
  $: style = `--color: ${actualColor}`;
</script>

<div class="s-component s-input-container {klass}" {style}>
  {#if label}
    <slot name="label">
      <Label
        {labelOnTop}
        {focused}
        {error}
        {outlined}
        {filled}
        {prepend}
        {color}
        {bgColor}
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
      class:filled
      class:outlined
      class:error
      {disabled}
      on:focus={toggleFocus}
      on:blur={toggleFocus}
      use:forwardEvents
      placeholder={!value ? placeholder : ''}
    />
  {:else if textarea && !select}
    <textarea
      {rows}
      aria-label={label}
      bind:value
      class="s-input textarea"
      class:filled
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
    <Hint {error} {hint} beeg={outlined || filled} />
  {/if}
</div>

<style>
  div {
    position: relative;
    margin: 0.5rem 0 1.5rem 0;
    color: var(--input-text-color);
    text-align: left;
  }

  div:hover {
    --input-border-color: var(--input-text-color);
  }

  .s-input {
    border-radius: 0.25rem 0.25rem 0 0;
    padding: 0.5rem 0;
    margin-bottom: 0px;
    box-sizing: border-box;
    width: 100%;

    caret-color: var(--color);
    color: var(--input-text-color);

    border: 0;

    font-size: 100%;
  }

  .s-input:focus {
    outline: none;
  }

  .s-input.filled, .s-input.outlined {
    padding: 1.5rem 0.75rem 0.625rem 0.75rem;
  }

  .s-input.filled {
    background-color: var(--input-bg-color);
  }

  .s-input.filled:focus {
    background-color: var(--input-bg-focus-color);
  }

  .s-input.outlined {
    padding: 1rem 0.75rem;
    border: var(--input-border-color) 1px solid;
    border-radius: var(--border-radius-rounded);
    background-color: #00000000;
  }

  .s-input.outlined:focus {
    padding: calc(1rem - 1px) calc(0.75rem - 1px);
    border-width: 2px;
    border-color: var(--color);
  }

  .s-input.error,.s-input.error:focus,.s-input.error:hover {
    caret-color: var(--error-color);
    border-color: var(--error-color);
  }

  textarea {
    resize: vertical;
  }
</style>
