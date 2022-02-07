<script context="module">
  let amountCreated = 0;
</script>

<script>
  import { radioKey } from '../../js/constants.js';
  import { getColor } from '../../js/utils.js';
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

  $: style = `--color: ${getColor(color)}`;
</script>

<div
  bind:this={radio}
  class="s-component s-radio"
  class:selected
  role="radio"
  {style}
>
  <slot name="prepend">
    <Icon color={selected ? getColor(color) : 'var(--radio-inactive-color)'}>
      {selected ? 'radio_button_checked' : 'radio_button_unchecked'}
    </Icon>
  </slot>
  <input {id} type="radio" name={$name} {value} />
  <label for={id}>
    <slot />
  </label>
</div>

<style>
  .s-radio {
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
  }

  .s-radio > :global(*) {
    vertical-align: middle;
  }

  input {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    opacity: 0;
    user-select: none;
  }
</style>
