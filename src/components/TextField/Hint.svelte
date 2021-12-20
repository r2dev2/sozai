<svelte:options immutable />

<script>
  import { fly } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';

  export let error = '';
  export let hint = '';
  export let transitionProps = { y: -10, duration: 100, easing: quadOut };
</script>

<div
  class="s-hint"
  class:error={Boolean(error)}
  class:hint={Boolean(hint)}
  transition:fly={transitionProps}
>
  {hint}
  {error}
</div>

<style>
  .s-hint {
    position: absolute;
    padding: 0.25rem 0 1rem 0.75rem;
    font-size: var(--font-size-x-small);
  }

  .error {
    color: var(--error-color);
  }

  .hint {
    color: var(--hint-color);
  }
</style>
