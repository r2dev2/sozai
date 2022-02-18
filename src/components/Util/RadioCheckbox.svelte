<script>
  import ripple from '../../js/ripple.js';
  import { groupItem } from '../../js/group.js';

  import { getContext, onMount } from 'svelte';

  import { writable } from 'svelte/store';

  export let key = Symbol();
  export let color = '';
  export let inactiveColor = '';
  export let value = '';
  export let id = '';
  export let selected = false;
  export let type = '';
  export let role = '';

  /** @type {HTMLElement | undefined} */
  let div;

  const defaultStores = {
    name: writable(''),
  };

  const { name } = {
    ...defaultStores,
    .../** @type {typeof defaultStores} */ (getContext(key)),
  };

  onMount(() => {
    if (!div) return;
    const { destroy, selected: ss } = groupItem(key, div);
    const sSub = ss.subscribe((s) => (selected = s));
    return () => {
      sSub();
      destroy();
    };
  });

  $: style = `--icon-color: ${selected ? color : inactiveColor};`;
</script>

<div
  bind:this={div}
  class="s-component s-radio-checkbox"
  class:selected
  {role}
  {style}
>
  <slot name="prepend" />
  <div
    class="ripple-container"
    use:ripple={{
      centered: true,
      color: 'var(--icon-color)',
    }}
  />
  <input {id} {type} name={$name} {value} />
  <label for={id}>
    <slot />
  </label>
</div>

<style>
  .s-radio-checkbox {
    --input-width: 1.5rem;
    --hover-scale: 1.75;
    position: relative;
    text-align: left;
    margin-bottom: 0.5rem;
  }

  .s-radio-checkbox:hover,
  .s-radio-checkbox *:hover {
    cursor: pointer;
  }

  .s-radio-checkbox > label {
    color: var(--radio-text-color);
    padding-left: 0.25rem;
  }

  .s-radio-checkbox > :global(*) {
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
    background-color: var(--icon-color);
    opacity: 0;
  }

  .ripple-container:hover::before {
    opacity: 0.2;
  }
</style>
