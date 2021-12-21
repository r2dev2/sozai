<script>
  // TODO filled dense textfield
  import { tick } from 'svelte';
  import { fontLoaded } from '../../js/store.js';
  import { getColor } from '../../js/utils.js';

  export let dense = false;
  export let focused = false;
  export let error = false;
  export let outlined = false;
  export let filled = false;
  export let labelOnTop = false;
  export let prepend = false;
  export let color = 'primary';
  export let bgColor = 'var(--app-bg-color)';

  let labelWidth = 0;
  let loaded = false;

  $: if (labelWidth > 0 && $fontLoaded) {
    tick().then(() => loaded = true);
  }
  $: style = `--color: ${getColor(color)}; --bg-color: ${bgColor}; --label-width: ${labelWidth}px;`;
</script>

<div class="s-label" {style}>
  <div class="outlined-cover" class:cover={outlined && labelOnTop} class:loaded />
  
  <label
    bind:clientWidth={labelWidth}
    class:dense
    class:error
    class:filled
    class:outlined
    class:top={labelOnTop}
    class:focused
  >
    <slot />
  </label>
</div>

<style>
  .outlined-cover {
    position: absolute;
    top: -.375rem;
    left: 0.5rem;
    height: 11px;
    width: 0.001px;
    background-color: var(--bg-color);
  }

  .outlined-cover.loaded {
    /* get cubic bezier from vuetify */
    transition: width var(--transition-duration) cubic-bezier(.25,.8,.5,1);
  }

  .cover {
    width: calc(0.5rem + 0.75 * var(--label-width));
  }

  label {
    position: absolute;
    top: 0.5rem;
    right: auto;
    transform-origin: top left;

    cursor: text;
    pointer-events: none;

    line-height: var(--line-height-medium);
    transition: transform var(--transition-duration);
  }

  .filled {
    top: 1.125rem;
    left: 0.75rem;
  }

  .outlined {
    top: 1rem;
    left: 0.75rem;
  }

  .dense {
    top: 0;
  }

  .dense.outlined {
    top: 0.5rem;
  }

  .top {
    transform: translateY(-1.125rem) scale(0.75);
  }

  .top.filled {
    transform: translateY(-0.875rem) scale(0.75);
  }

  .top.outlined {
    transform: translateY(-1.5rem) scale(0.75);
  }

  .top.dense {
    transform: translateY(-1rem) scale(0.75);
  }

  .focused {
    color: var(--color);
  }

  .error {
    color: var(--error-color);
  }
</style>
