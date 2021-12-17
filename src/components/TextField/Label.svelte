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

  $: style = `--color: ${getColor(color)}`;
</script>

<label
  class:error
  class:outlined
  class:top={labelOnTop}
  class:dense
  class:focused
  {style}
>
  <slot />
</label>

<style>
  label {
    position: absolute;
    top: 1.125rem;
    left: 0.75rem;
    right: auto;

    cursor: text;
    pointer-events: none;

    line-height: var(--line-height-medium);
    transition: var(--transition-duration);
  }

  .top {
    transform-origin: top left;
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
  .outlined.top {
    background-color: white; /* TODO check actual bg color */
    transform: translateY(-1.5rem) scale(.75);
  }
</style>
