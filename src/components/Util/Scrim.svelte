<script>
  import { fade } from 'svelte/transition';
  import { quadOut, quadIn } from 'svelte/easing';

  export let opacity = 0.5;
  export let inProps = { duration: 200, easing: quadIn };
  export let outProps = { duration: 200, easing: quadOut };
  export let notransition = false;
</script>

{#if notransition}
  <div class="s-scrim" style="opacity: {opacity}" on:click />
{:else}
  <div
    class="s-scrim"
    in:fade={inProps}
    out:fade={outProps}
    style="opacity: {opacity}"
    on:click
  />
{/if}

<style>
  .s-scrim {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: black;
  }
</style>
