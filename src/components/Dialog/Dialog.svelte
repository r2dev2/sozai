<script>
  import { scale } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { quadIn } from 'svelte/easing';
  import Scrim from '../Util/Scrim.svelte';
  import { getColor } from '../../js/utils.js';

  export let value = false;
  export let opacity = 0.5;
  export let persistent = false;
  export let color = 'white';

  export let transitionProps = { duration: 150, easing: quadIn, delay: 150 };

  $: style = `--color: ${getColor(color)}`;
</script>

{#if value}
  <div class="s-component dialog-overlay" {style}>
    <Scrim {opacity} on:click={() => !persistent && (value = false)} />
    <div class="s-dialog-container">
      <div class="s-dialog" in:scale={transitionProps}>
        <div class="title">
          <slot name="title" />
        </div>
        <slot />
        <div class="actions">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;

    width: 100%;
    height: 100%;
  }

  .s-dialog-container {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .s-dialog {
    z-index: 50;
    padding: 1rem;
    align-items: center;
    border-radius: var(--border-radius-rounded);
    box-shadow: var(--shadow);
    background-color: var(--color);
  }

  .title {
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-bold);
    padding-bottom: 1rem;
  }

  .actions {
    padding-top: 1rem;
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
</style>
