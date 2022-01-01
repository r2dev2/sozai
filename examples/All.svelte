<script>
  import 'prismjs';

  import { SozaiApp } from '../src';
  import Button from './Button.svelte';
  import DarkMode from './DarkMode.svelte';
  import Dialog from './Dialog.svelte';
  import TextField from './TextField.svelte';
  import Theming from './Theming.svelte';
  import Typography from './Typography.svelte';

  const components = {
    button: Button,
    darkmode: DarkMode,
    dialog: Dialog,
    textfield: TextField,
    theming: Theming,
    typography: Typography,
  };

  let toShow = window.localStorage.getItem('com') ?? new URLSearchParams(location.search).get('com');

  $: if (!components[toShow]) {
    toShow = 'button';
  }

  $: component = components[toShow];
  $: window.localStorage.setItem('com', toShow);
</script>

<SozaiApp>
  <label for="to-demo">Component to demo</label>
  <select bind:value={toShow} name="to-demo">
    {#each Object.keys(components) as value}
      <option {value}>{value}</option>
    {/each}
  </select>
  <div>
    <svelte:component this={component} />
  </div>
</SozaiApp>

<style>
  div {
    padding-top: 1rem;
  }

  :root {
    --transition-duration: 300ms !important;
  }
</style>
