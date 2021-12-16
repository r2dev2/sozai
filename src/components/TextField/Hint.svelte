<svelte:options immutable tag="sozai-hint" />

<script>
  export let error = '';
  export let hint = '';
  // TODO figure out why and how transition stuff
</script>

<div class="s-hint" class:error={Boolean(error)} class:hint={Boolean(hint)}>
  {hint}
  {error}
</div>

<style>
  .s-hint {
    position: absolute;
    padding: 0.25rem 0 1rem 0.25rem;
    font-size: var(--font-size-x-small);
  }

  .error {
    color: var(--error-color);
  }

  .hint {
    color: var(--hint-color);
  }
</style>
