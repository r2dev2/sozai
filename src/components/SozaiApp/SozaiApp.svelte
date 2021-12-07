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
    --font-size-medium: 1rem;
    --line-height-medium: 1.5rem;
    --font-weight-medium: 500;
    --border-radius-rounded: 0.25rem;
    --border-width: 1px;

    /* Customizable colors */
    --primary-color: #B027B0;
    --secondary-color: #009688;
    --error-color: #F44336;
    --success-color: #4CAF50;
    --alert-color: #FF9800;
    --dark-color: #212121;

    /* Material pallete colors */
    --red: #F44336;
    --pink: #E91E63;
    --purple: #9C27B0;
    --deep-purple: #673AB7;
    --indigo: #3F51B5;
    --blue: #2196F3;
    --light-blue: #03A9F4;
    --cyan: #00BCD4;
    --teal: #009688;
    --green: #4CAF50;
    --light-green: #8BC34A;
    --lime: #CDDC39;
    --yellow: #FFEB3B;
    --amber: #FFC107;
    --orange: #FF9800;
    --brown: #795548;

    /* Internal colors */
    --disabled-bg-color: #E0E0E0; /* found from inspecting smeltejs docs */
    --disabled-text-color: #9E9E9E; /* found from inspecting smeltejs docs */
    --input-bg-color: #f3f4f6;
    --input-text-color: #4b5563;

    --brighten: brightness(110%);
    --darken: brightness(90%);
    --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

    --transition-duration: 200ms;
    --ripple-centered-duration: 400ms;
    --ripple-normal-duration: 600ms;
  }

  div {
    font-family: roboto,medium;
  }

  div :global(.s-component) {
    font-family: roboto,medium !important;
  }

  div :global(.ripple) {
    border-radius: 50%;
    position: absolute;
    transform: scale(0);
  }

  div :global(.ripple-normal) {
    animation: ripple-normal-animation var(--ripple-normal-duration);
  }

  div :global(.ripple-centered) {
    animation: ripple-centered-animation var(--ripple-centered-duration);
  }

  @keyframes ripple-normal-animation {
    to {
      opacity: 0;
      transform: scale(2.5);
    }
  }

  @keyframes ripple-centered-animation {
    to {
      opacity: 0;
      transform: scale(1);
    }
  }
</style>
