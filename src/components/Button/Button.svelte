<script>
  export let value = false;
  export let color = 'primary';
  export let outlined = false;
  export let text = false;
  export let block = false;
  export let disabled = false;
  /** @type {string | null} */
  export let icon = null;
  export let small = false;
  export let light = false;
  export let dark = false;
  export let flat = false;
  export let klass = '';
  export let iconKlass = '';
  export let style = '';
  export let iconStyle = '';
</script>

<button class="s-component s-button">
  <slot />
</button>

<style>
  .s-button {
    z-index: 10;
    position: relative;
    padding: 0.5rem 1rem;

    text-transform: uppercase;
    font-size: var(--font-size-small);
    line-height: var(--line-height-small);
    font-weight: var(--font-weight-medium);

    background-color: var(--primary-color);
    border-color: var(--primary-color);
    color: #FFFFFF;

    border-radius: var(--border-radius-rounded);
    box-shadow: var(--shadow);
    border-style: solid;
    overflow: hidden;
    transition: var(--transition-duration) ease-in;
  }

  .s-button:hover {
    cursor: pointer;
    filter: var(--brighten);
  }
</style>
