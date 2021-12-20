<svelte:options immutable />

<script>
  import { onMount } from 'svelte';
  import { fontLoaded } from '../../js/store.js';

  export let noicon = false;
  export let nofont = false;

  $: if (nofont) {
    fontLoaded.set(true);
  }
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
      on:load={() => fontLoaded.set(true)}
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
    --font-size-x-small: 0.75rem;
    --font-size-small: 0.875rem;
    --line-height-small: 1.25rem;
    --font-size-medium: 1rem;
    --line-height-medium: 1.5rem;
    --font-weight-medium: 500;
    --font-size-large: 1.25rem;
    --font-weight-bold: 700;
    --border-radius-rounded: 0.25rem;
    --border-width: 1px;

    /* Customizable colors */
    /* Smelte uses #B027B0 as primary color but vuetify uses the blue which looks nicer */
    /* Smelte's choices:
    --primary-color: #B027B0;
    --secondary-color: #009688;
    --error-color: #F44336;
    */
    --primary-color: #2196F3;
    --secondary-color: #424242;
    --error-color: #FF5252;
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
    --app-bg-color: white;
    --disabled-bg-color: #E0E0E0; /* found from inspecting smeltejs docs */
    --disabled-text-color: #9E9E9E; /* found from inspecting smeltejs docs */
    --input-bg-color: #F3F4F6;
    --input-bg-focus-color: #D1D5DB;
    --input-label-text-color: #4B5563;
    --input-text-color: black;
    --light-dialog-bg-color: #FFFFFF;
    --dark-dialog-bg-color: #424242;
    --dialog-bg-color: var(--light-dialog-bg-color);
    --hint-color: #757575;
    --outlined-border-color: #EEEEEE;

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

  div :global(.s-component), div :global(.s-component textarea) {
    font-family: roboto,medium !important;
  }

  /* TODO: do the rest of the headers */
  div :global(h5) {
    font-weight: 400;
    font-size: 1.5rem;
    letter-spacing: 0;
    margin: 0; /* do for rest of headers as well */
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
