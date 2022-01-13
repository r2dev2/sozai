<script>
  import ripple from '../../js/ripple.js';
  import { getColor } from '../../js/utils.js';

  import Icon from '../Icon/Icon.svelte';

  export let color = 'primary';
  export let icon = '';
  export let selected = false;

  $: actualColor = getColor(color);
  $: style_ = `--color: ${actualColor};`;
</script>

<li class="s-component s-listitem" class:selected style={style_} use:ripple>
  <slot name="prepend">
    {#if icon}
      <Icon color={selected ? actualColor : 'var(--secondary-color)'}>{icon}</Icon>
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
    transition: var(--transition-duration) ease-in;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .selected::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color);
    opacity: 0.12;
  }

  .selected {
    color: var(--color);
  }

  .s-listitem :global([slot=title]) {
    font-size: var(--font-size-medium);
  }

  .s-listitem :global([slot=subtitle]) {
    font-size: var(--font-size-small);
    opacity: var(--listitem-subtitle-opacity);
  }
</style>
