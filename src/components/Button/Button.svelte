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

<button>
  <slot />
</button>
