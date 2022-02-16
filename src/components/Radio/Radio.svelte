<script context="module">
  let amountCreated = 0;
</script>

<script>
  import { radioKey } from '../../js/constants.js';
  import { getColor } from '../../js/utils.js';
  import ripple from '../../js/ripple.js';
  import { groupItem } from '../../js/group.js';
  import Icon from '../Icon/Icon.svelte';

  import { getContext, onMount } from 'svelte';

  import { writable } from 'svelte/store';

  export let color = 'var(--primary-color)';
  export let value = '';
  export let id = '';
  export let selected = false;

  /** @type {HTMLElement | undefined} */
  let radio;

  const defaultStores = {
    name: writable(''),
  };

  const { name } = {
    ...defaultStores,
    .../** @type {typeof defaultStores} */ (getContext(radioKey)),
  };

  $: if (id === '') {
    id = `s-radio-${amountCreated++}`;
  }

  onMount(() => {
    if (!radio) return;
    const { destroy, selected: ss } = groupItem(radioKey, radio);
    const sSub = ss.subscribe((s) => (selected = s));
    return () => {
      sSub();
      destroy();
    };
  });

  $: radioIconColor = selected
    ? getColor(color)
    : 'var(--radio-inactive-color)';

  $: style = `--color: ${getColor(
    color
  )}; --radio-icon-color: ${radioIconColor}`;
</script>

<div
  bind:this={radio}
  class="s-component s-radio"
  class:selected
  role="radio"
  {style}
>
  <slot name="prepend">
    <Icon color={radioIconColor}>
      {selected ? 'radio_button_checked' : 'radio_button_unchecked'}
    </Icon>
  </slot>
  <div
    class="ripple-container"
    use:ripple={{
      centered: true,
      color: 'var(--radio-icon-color)',
    }}
  />
  <input {id} type="radio" name={$name} {value} />
  <label for={id}>
    <slot />
  </label>
</div>

<style>
  .s-radio {
    --input-width: 1.5rem;
    --hover-scale: 1.75;
    position: relative;
    text-align: left;
    margin-bottom: 0.5rem;
  }

  .s-radio:hover,
  .s-radio *:hover {
    cursor: pointer;
  }

  .s-radio > label {
    color: var(--radio-text-color);
    padding-left: 0.25rem;
  }

  .s-radio > :global(*) {
    vertical-align: middle;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    z-index: -1;
    width: 1.5rem;
    height: 1.5rem;
    opacity: 0;
    user-select: none;
  }

  .ripple-container {
    position: absolute;
    top: 50%;
    left: calc(-0.5 * var(--input-width));
    width: calc(var(--input-width) * var(--hover-scale));
    height: calc(var(--input-width) * var(--hover-scale));
    transform: translate(2px, -50%);
    border-radius: 50%;
    overflow: hidden;
  }

  .ripple-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--radio-icon-color);
    opacity: 0;
  }

  .ripple-container:hover::before {
    opacity: 0.2;
  }
</style>
