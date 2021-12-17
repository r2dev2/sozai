<script>
  import { getColor } from '../../js/utils.js';

  export let focused = false;
  export let error = false;
  export let outlined = false;
  export let labelOnTop = false;
  export let prepend = false;
  export let color = 'primary';
  export let bgColor = 'white';
  export let dense = false;

  let labelWidth = 0;

  $: style = `--color: ${getColor(color)}; --label-width: ${labelWidth}px;`;
</script>

<div class="s-label" {style}>
  <div class="outlined-cover" class:cover={outlined && labelOnTop} />
  
  <label
    bind:clientWidth={labelWidth}
    class:error
    class:outlined
    class:top={labelOnTop}
    class:dense
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
    background-color: white;
    height: 11px;
    width: 0.001px;
    /* get cubic bezier from vuetify */
    transition: width var(--transition-duration) cubic-bezier(.25,.8,.5,1);
  }
  .cover {
    width: calc(0.5rem + 0.75 * var(--label-width));
  }

  label {
    position: absolute;
    top: 1.125rem;
    left: 0.75rem;
    right: auto;
    transform-origin: top left;

    cursor: text;
    pointer-events: none;

    line-height: var(--line-height-medium);
    transition: var(--transition-duration);
  }

  .top {
    transform: translateY(-0.875rem) scale(.75);
  }

  .focused {
    color: var(--color);
  }

  .error {
    color: var(--error-color);
  }

  .outlined {
    top: 1rem;
  }

  /* TODO make it actually do a vuetify-like textfield animation where one sees the border disappearing */
  /* Notes: they do it by putting a figureset > legend at top and expanding the legend's width */
  .outlined.top {
    transform: translateY(-1.5rem) scale(.75);
  }
</style>
