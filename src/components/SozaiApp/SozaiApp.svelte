<script>
  /* eslint-disable max-len */
  import { fontLoaded, theme } from '../../js/store.js';

  // export let noicon = false;
  export let nofont = false;

  $: if (nofont) {
    fontLoaded.set(true);
  }

  $: document.documentElement.setAttribute('data-theme', $theme);
</script>

<svelte:options immutable />

<svelte:head>
  <!-- {#if !noicon}
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500|Material+Icons&display=swap"
      rel="stylesheet"
    />
  {/if} -->
  {#if !nofont}
    <link
      on:load={() => fontLoaded.set(true)}
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500|Material+Icons&display=swap"
      rel="stylesheet"
    />
  {/if}
</svelte:head>

<div class="sozai-app">
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
    --primary-color: #2196f3; /* Primary color */
    --secondary-color: #424242; /* Secondary color */
    --error-color: #ff5252; /* Error color */
    --success-color: #4caf50; /* Success color */
    --alert-color: #ff9800; /* Alert color */
    --dark-color: #212121; /* Dark color */

    /**
      Section: Material Pallete Colors
      Description: Colors from the official material color pallete. When referring to these colors in the color prop, you may use 'red' instead of 'var(--red)' and so on for each of these colors.
    */
    --red: #f44336; /* Red */
    --pink: #e91e63; /* Pink */
    --purple: #9c27b0; /* Purple */
    --deep-purple: #673ab7; /* Deep purple */
    --indigo: #3f51b5; /* Indigo */
    --blue: #2196f3; /* Blue */
    --light-blue: #03a9f4; /* Light blue */
    --cyan: #00bcd4; /* Cyan */
    --teal: #009688; /* Teal */
    --green: #4caf50; /* Green */
    --light-green: #8bc34a; /* Light green */
    --lime: #cddc39; /* Lime */
    --yellow: #ffeb3b; /* Yellow */
    --amber: #ffc107; /* Amber */
    --orange: #ff9800; /* Orange */
    --brown: #795548; /* Brown */

    /**
      Section: Internal Colors
      Description: Colors used in various components, change these for theming. Each component will mention which css vars it uses.
    */
    --app-bg-color: #ffffff; /* App background color */
    --text-color: #000000; /* App text color */
    --disabled-bg-color: #e0e0e0; /* Background color for disabled buttons */
    --disabled-text-color: #9e9e9e; /* Text color for disabled buttons */
    --input-bg-color: #f3f4f6; /* Background color for filled textfields */
    --input-bg-focus-color: #d1d5db; /* Background color for focused filled textfields */
    --input-label-text-color: #4b5563; /* Text color for textfield labels */
    --input-text-color: #000000; /* Text color for textfields */
    --input-border-color: #9e9e9e; /* Border color for textfields */
    --hint-color: #757575; /* Text color for hints in textfields */
    --dialog-bg-color: #ffffff; /* Background color for dialogs */
    --listitem-subtitle-opacity: 0.6; /* Text opacity of listitem subtitles */
    --radio-inactive-color: #424242; /* Color for inactive radio bubble */
    --radio-text-color: #424242; /* Color for radio text */

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
    --shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 1px 5px 0 rgba(0, 0, 0, 0.12); /* Box shadow for elements */
    --select-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12); /* Box shadow for select lists from vuetify */
    --nav-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
      0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12); /* Box shadow for navigation headers */

    /**
      Section: Durations
      Description: Durations used for various animations.
    */
    --transition-duration: 200ms; /* Duration of transitions */
    --ripple-duration: 300ms; /* Duration of ripples */
    --select-activate-duration: 100ms; /* Duration of activate select fade */
    --slider-transition-duration: 200ms; /* Duration of slider transitions */
  }

  :root[data-theme='dark'] {
    --app-bg-color: #212121;
    --dialog-bg-color: #424242;
    --input-text-color: #f5f5f5;
    --input-bg-color: #1d1d1d;
    --input-bg-focus-color: #1d1d1d;
    --input-border-color: #eeeeee;
    --listitem-subtitle-opacity: 0.7;
    --primary-color: #2196f3;
    --radio-inactive-color: #f5f5f5;
    --radio-text-color: #bcbcbc;
    --text-color: #f5f5f5;
  }

  :global(button:focus) {
    outline: none;
  }

  :global(body) {
    margin: 0;
    min-height: 100vh;
  }

  .sozai-app {
    -webkit-tap-highlight-color: transparent;
    background-color: var(--app-bg-color);
    color: var(--text-color);
    font-family: roboto, medium;
    min-height: 100vh;
  }

  div :global(.s-component),
  div :global(.s-component textarea) {
    font-family: roboto, medium !important;
  }

  div :global(h1),
  div :global(h2),
  div :global(h3),
  div :global(h4),
  div :global(h5),
  div :global(h6) {
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

  div :global(.body-1),
  :global(body) {
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

  div :global(.fade-in) {
    opacity: 1;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: var(--fade-duration);
  }

  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
