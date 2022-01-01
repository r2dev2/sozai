<script>
  import 'prismjs';

  import { theme, SozaiApp } from '../src';
  import Button from './Button.svelte';
  import CustomTheme from './CustomTheme.svelte';
  import Dialog from './Dialog.svelte';
  import TextField from './TextField.svelte';
  import Theming from './Theming.svelte';
  import Typography from './Typography.svelte';

  const components = {
    button: Button,
    customtheme: CustomTheme,
    dialog: Dialog,
    textfield: TextField,
    theming: Theming,
    typography: Typography,
  };

  let toShow = window.localStorage.getItem('com') ?? new URLSearchParams(location.search).get('com');
  const defaultTheme = window.localStorage.getItem('theme');

  if (defaultTheme) {
    theme.set(defaultTheme);
  }

  $: if (!components[toShow]) {
    toShow = 'button';
  }

  $: component = components[toShow];
  $: window.localStorage.setItem('com', toShow);
  $: window.localStorage.setItem('theme', $theme);
</script>

<SozaiApp>
  <div class="demos">
    <label for="to-demo">Component to demo</label>
    <select bind:value={toShow} name="to-demo">
      {#each Object.keys(components) as value}
        <option {value}>{value}</option>
      {/each}
    </select>
    <div class="demo">
      <svelte:component this={component} />
    </div>
  </div>
</SozaiApp>

<style>
  .demo {
    padding-top: 1rem;
  }

  .demos {
    padding: 0.5rem;
  }

  :root {
    --transition-duration: 300ms !important;
  }
</style>
