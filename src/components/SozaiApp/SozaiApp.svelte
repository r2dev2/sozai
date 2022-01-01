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
    /**
      Section: Typography
      Description: Customize font-related properties
     */
    --font-size-x-small: 0.75rem; /* Extra small font size */
    --font-size-small: 0.875rem; /* Small font size */
    --line-height-small: 1.25rem; /* Line height for small font */
    --font-size-medium: 1rem; /* Medium font size */
    --line-height-medium: 1.5rem; /* Line height for medium font */
    --font-weight-medium: 500; /* Weight for medium font */
    --font-size-large: 1.25rem; /* Large font size */
    --font-weight-bold: 700; /* Bold font weight */

    /**
      Section: App Colors
      Description: Color pallete of sozai app. When referring to these colors in the color prop, you may use 'primary' instead of 'var(--primary-color)' and so on for each of these colors. These defaults are from vuetify. The ones not declared in vuetify are from smelte.
    */
    --primary-color: #2196F3; /* Primary color */
    --secondary-color: #424242; /* Secondary color */
    --error-color: #FF5252; /* Error color */
    --success-color: #4CAF50; /* Success color */
    --alert-color: #FF9800; /* Alert color */
    --dark-color: #212121; /* Dark color */

    /**
      Section: Material Pallete Colors
      Description: Colors from the official material color pallete. When referring to these colors in the color prop, you may use 'red' instead of 'var(--red)' and so on for each of these colors.
    */
    --red: #F44336; /* Red */
    --pink: #E91E63; /* Pink */
    --purple: #9C27B0; /* Purple */
    --deep-purple: #673AB7; /* Deep purple */
    --indigo: #3F51B5; /* Indigo */
    --blue: #2196F3; /* Blue */
    --light-blue: #03A9F4; /* Light blue */
    --cyan: #00BCD4; /* Cyan */
    --teal: #009688; /* Teal */
    --green: #4CAF50; /* Green */
    --light-green: #8BC34A; /* Light green */
    --lime: #CDDC39; /* Lime */
    --yellow: #FFEB3B; /* Yellow */
    --amber: #FFC107; /* Amber */
    --orange: #FF9800; /* Orange */
    --brown: #795548; /* Brown */

    /**
      Section: Internal Colors
      Description: Colors used in various components, change these for theming. Each component will mention which css vars it uses.
    */
    --app-bg-color: #FFFFFF; /* App background color */
    --disabled-bg-color: #E0E0E0; /* Background color for disabled buttons */
    --disabled-text-color: #9E9E9E; /* Text color for disabled buttons */
    --input-bg-color: #F3F4F6; /* Background color for filled textfields */
    --input-bg-focus-color: #D1D5DB; /* Background color for focused filled textfields */
    --input-label-text-color: #4B5563; /* Text color for textfield labels */
    --input-text-color: #000000; /* Text color for textfields */
    --input-border-color: #9E9E9E; /* Border color for textfields */
    --hint-color: #757575; /* Text color for hints in textfields */
    --light-dialog-bg-color: #FFFFFF; /* Background color for light-themed dialogs */
    --dark-dialog-bg-color: #424242; /* Background color for dark-themed dialogs */
    --dialog-bg-color: var(--light-dialog-bg-color); /* Background color for dialogs */


    /**
      Section: Component sizes
      Description: Sizes used in various components. Each component will mention which css vars it uses.
  */
    --border-radius-rounded: 0.25rem; /* Rounded corner radius */
    --border-width: 1px; /* Border width */

    /**
      Section: Effects
      Description: Special effects used in various compoennts.
    */
    --brighten: brightness(110%); /* Filter for brightening elements */
    --darken: brightness(90%); /* Filter for darkening elements */
    --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* Box shadow for elements */


    /**
      Section: Durations
      Description: Durations used for various animations.
    */
    --transition-duration: 200ms; /* Duration of transitions */
    --ripple-centered-duration: 400ms; /* Duration of ripples that start at the center of elements */
    --ripple-normal-duration: 600ms; /* Duration of normal ripples (this is probably the one you want to modify */
  }

  div {
    font-family: roboto,medium;
  }

  div :global(.s-component), div :global(.s-component textarea) {
    font-family: roboto,medium !important;
  }

  div :global(h1), div :global(h2), div :global(h3), div :global(h4), div :global(h5), div :global(h6) {
    margin: 0;
  }

  div :global(h1) {
    font-weight: lighter;
    font-size: 6rem;
    letter-spacing: -1.5px;
  }

  div :global(h2) {
    font-weight: lighter;
    font-size: 3.75rem;
    letter-spacing: -0.5px;
  }

  div :global(h3) {
    font-weight: normal;
    font-size: 3rem;
    letter-spacing: 0;
  }

  div :global(h4) {
    font-weight: normal;
    font-size: 2.125rem;
    letter-spacing: 0.25px;
  }

  div :global(h5) {
    font-weight: normal;
    font-size: 1.5rem;
    letter-spacing: 0;
  }

  div :global(h6) {
    font-weight: normal;
    font-size: 1.25rem;
    letter-spacing: 0.15px;
  }

  div :global(.subtitle-1) {
    font-weight: normal;
    font-size: 1rem;
    letter-spacing: 0.15px;
  }

  div :global(.subtitle-2) {
    font-weight: normal;
    font-size: 0.875rem;
    letter-spacing: 0.1px;
  }

  div :global(.body-1) {
    font-weight: normal;
    font-size: 1rem;
    letter-spacing: 0.5px;
  }

  div :global(.body-2) {
    font-weight: normal;
    font-size: 0.875rem;
    letter-spacing: 0.25px;
  }

  div :global(.caption) {
    font-weight: normal;
    font-size: 0.75rem;
    letter-spacing: 0.4px;
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
