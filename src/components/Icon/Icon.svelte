<script>
  export let small = false;
  export let xs = false;
  export let reverse = false;
  export let tip = false;
  export let color = '';
  export let klass = '';
  export let style = '';

  $: style_ = `${color ? `--color: ${color};` : ''} ${style}`.trim();
</script>

<svelte:options immutable />

<i
  aria-hidden
  class={klass}
  class:reverse
  class:tip
  class:small
  class:xs
  on:click
  style={style_}
>
  <slot />
</i>

<style>
  i {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 1.5rem;
    line-height: 1;
    letter-spacing: normal;
    color: var(--color);
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    font-feature-settings: 'liga';
    -moz-font-feature-settings: 'liga';
  }

  .small {
    font-size: var(--font-size-medium);
    line-height: var(--line-height-medium);
  }
</style>
