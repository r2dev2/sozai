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
    top: 0;
    padding: 1rem 1rem 0.5rem 1rem;

    cursor: text;
    pointer-events: none;

    line-height: var(--line-height-medium);
    transition: font-size 50ms, line-height 100ms;
  }

  .top {
    line-height: 0.05;
    font-size: 0.7rem;
  }

  .focused {
    color: var(--color);
  }

  .error {
    color: var(--error-color);
  }

  /* TODO make it actually do a vuetify-like textfield animation where one sees the border disappearing */
  .outlined.top {
    margin-top: 0rem;
    margin-left: 0.75rem;
    padding: 0 0.25rem 0.25rem 0.25rem;
    background-color: white; /* TODO check actual bg color */
  }
</style>
