<script>
  import { get_current_component } from 'svelte/internal';

  import createRipple from '../../js/ripple.js';
  import { forwardEventsBuilder } from '../../js/forwardEvents.js';
  import { getColor } from '../../js/utils.js';

  import Icon from '../Icon/Icon.svelte';

  export let value = false;
  export let color = 'primary';
  export let outlined = false;
  export let text = false;
  export let block = false;
  export let disabled = false;
  /** @type {string | null} */
  export let icon = null;
  export let small = false;
  export let dense = false;
  export let light = false;
  export let dark = false;
  export let flat = false;
  export let klass = '';
  export let iconKlass = '';
  export let style = '';
  export let iconStyle = '';

  const forwardEvents = forwardEventsBuilder(get_current_component());

  const toggleValue = () => {
    value = !value;
  };

  $: actualColor = getColor(color);
  $: ripple = createRipple((text || outlined) ? actualColor : '#FFFFFF');
  $: style_ = `--button-color: ${actualColor}; ${style}`.trim();
</script>

<button
  class="s-component s-button {klass}"
  class:light
  class:dark
  class:block
  class:outlined
  class:dense
  class:icon={Boolean(icon)}
  class:flat
  class:text
  {disabled}
  style={style_}
  on:click={toggleValue}
  use:forwardEvents
  use:ripple
>
  {#if icon}
    <div class="icon-content">
      <Icon {dense} {small}>{icon}</Icon>
    </div>
  {/if}
  <slot />
</button>

<style>
  .s-button {
    z-index: 10;
    position: relative;
    padding: 0.5rem 1rem;
    width: max-content;

    text-transform: uppercase;
    font-size: var(--font-size-small);
    line-height: var(--line-height-small);
    font-weight: var(--font-weight-medium);

    background-color: var(--button-color);
    border-color: var(--button-color);
    color: #FFFFFF;

    border-radius: var(--border-radius-rounded);
    border-width: var(--border-width);
    box-shadow: var(--shadow);
    border-style: solid;
    overflow: hidden;
    transition: var(--transition-duration) ease-in;
  }

  .s-button:hover {
    cursor: pointer;
    filter: var(--brighten);
  }

  .light {
    filter: var(--brighten);
  }

  .dark, .dark:hover {
    filter: var(--darken);
  }

  .block {
    width: 100%;
  }

  .outlined, .text {
    --hover-opacity: 0.2;
    background-color: transparent;
    box-shadow: none;
  }

  .text {
    --hover-opacity: 0.05;
    border: 0px;
  }

  .outlined, .flat, .text {
    color: var(--button-color);
  }

  .outlined:hover::after, .text:hover::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 100%;

    background-color: var(--button-color);
    opacity: var(--hover-opacity, 0.2);
  }

  [disabled], [disabled]:hover {
    background-color: var(--disabled-bg-color);
    border-color: var(--disabled-bg-color);
    color: var(--disabled-text-color);
    box-shadow: none;
    filter: none;
    cursor: default;
  }

  .icon {
    border-radius: 9999px;
    padding: 1rem;
    height: 3.5rem;
  }

  .dense.icon {
    padding: 0;
    width: 2.5rem;
    height: 2.5rem;
  }

  .icon-content {
    display: flex;
    justify-content: center;
  }

  /* need to translate them because flex center still looks slightly lobsided */
  .icon-content :global(i) {
    transform: translateX(1px);
  }
</style>
