<script>
  export let noicon = false;
  export let nofont = false;
</script>

<svelte:head>
  {#if !noicon}
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500|Material+Icons&display=swap"
      rel="stylesheet"
    />
  {/if}
  {#if !nofont}
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500|Material+Icons&display=swap"
      rel="stylesheet"
    />
  {/if}
</svelte:head>

<div>
  <slot />
</div>

<style>
  :root {
    --font-size-small: .875rem;
    --line-height-small: 1.25rem;
    --font-weight-medium: 500;
    --border-radius-rounded: 0.25rem;
    --primary-color: #b027b0;
    --brighten: brightness(110%);
    --darken: brightness(90%);
    --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --transition-duration: 200ms;
  }

  :global(.s-component) {
    font-family: roboto,medium !important;
  }
</style>
