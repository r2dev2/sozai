<script>
  import { getColor } from '../../js/utils.js';

  export let noUnderline = false;
  export let outlined = false;
  export let focused = false;
  export let error = false;
  export let color = 'primary';

  $: style = `--color: ${getColor(color)}`;
</script>

<div class="line-container" class:hidden={noUnderline || outlined} {style}>
  <div class="line" class:focused />
</div>

<style>
  .line-container {
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 0px;
    border-bottom: 1px solid var(--input-text-color);
  }

  .line {
    width: 0px;
    height: 2px;
    margin: 0 auto;
    background-color: var(--color);
    transition: width 200ms ease;
  }

  .focused {
    width: 100%;
  }
</style>
