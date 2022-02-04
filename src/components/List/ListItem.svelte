<script>
  import { getContext, get_current_component } from 'svelte/internal';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { listKey } from '../../js/constants.js';
  import { forwardEventsBuilder } from '../../js/forwardEvents.js';
  import ripple from '../../js/ripple.js';
  import { getColor } from '../../js/utils.js';

  import Icon from '../Icon/Icon.svelte';
  import { groupItem } from '../../js/group.js';

  export let color = 'primary';
  export let icon = '';
  export let selected = false;

  /** @type {HTMLElement | undefined}*/
  let li;

  const defaultStores = {
    selectable: writable(false),
    multiselect: writable(false),
  };

  const { selectable, multiselect } = {
    ...defaultStores,
    .../** @type {typeof defaultStores} */ (getContext(listKey)),
  };

  const forwardEvents = forwardEventsBuilder(get_current_component());

  onMount(() => {
    // @ts-ignore
    li.setSelected = (s) => (selected = s);
    // @ts-ignore
    li.getSelected = () => selected;
  });

  onMount(() => {
    if (!li) return;
    const { destroy, selected } = groupItem(listKey, li);
    const sSub = selected.subscribe((s) => console.log('LISTITEM selected', s));
    return () => {
      sSub();
      destroy();
    };
  });

  $: actualColor = getColor(color);
  $: style_ = `--color: ${actualColor};`;
</script>

<li
  bind:this={li}
  class="s-component s-listitem"
  class:selected
  style={style_}
  use:ripple={{ disabled: !$selectable }}
  use:forwardEvents
>
  <slot name="prepend">
    {#if icon}
      <Icon color={selected ? actualColor : 'var(--secondary-color)'}
        >{icon}</Icon
      >
    {/if}
  </slot>
  <slot>
    <div class="content">
      <slot name="title" />
      <slot name="subtitle" />
    </div>
  </slot>
  <slot name="append" />
</li>

<style>
  .s-listitem {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 2rem;
    align-items: center;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    overflow: hidden;
    transition: var(--ripple-duration) ease-in;
    /* transition-delay: var(--ripple-duration); */
  }

  .s-listitem:hover {
    cursor: pointer;
  }

  .s-listitem::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: var(--secondary-color);
  }

  .s-listitem:hover::before,
  .selected::before {
    opacity: 0.12;
  }

  .selected::before {
    background-color: var(--color);
  }

  .selected {
    color: var(--color);
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .s-listitem :global([slot='title']) {
    font-size: var(--font-size-medium);
  }

  .s-listitem :global([slot='subtitle']) {
    font-size: var(--font-size-small);
    opacity: var(--listitem-subtitle-opacity);
  }

  .s-listitem :global(i) {
    transition: var(--ripple-duration) ease-in;
  }
</style>
