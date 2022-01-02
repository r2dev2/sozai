<script>
  import 'prismjs';

  import { theme, Button, SozaiApp } from '../src';
  import ButtonDemo from './Button.svelte';
  import Dialog from './Dialog.svelte';
  import TextField from './TextField.svelte';
  import Theming from './Theming.svelte';
  import Typography from './Typography.svelte';

  const components = {
    button: ButtonDemo,
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
    <header>
      <div class="logo">
        <h1>Sozai</h1>
      </div>
      <div class="demo-chooser">
        <label for="to-demo">Component to demo</label>
        <select bind:value={toShow} name="to-demo">
          {#each Object.keys(components) as value}
            <option {value}>{value}</option>
          {/each}
        </select>
      </div>
      <div class="light-dark-toggle">
        <Button
         color={$theme == 'dark' ? 'white' : 'black'}
         icon="wb_sunny"
         on:click={() => theme.set($theme == 'dark' ? 'light' : 'dark')}
         text light flat dense
       />
      </div>
    </header>
    <div class="demo">
      <svelte:component this={component} />
    </div>
  </div>
</SozaiApp>

<style>
  .demo {
    padding-top: 6rem;
  }

  .demos {
    padding: 0.5rem;
  }

  .logo {
    float: left;
    margin-right: 2rem;
  }

  .demo-chooser {
    float: left;
    margin-top: 1rem;
  }

  .light-dark-toggle {
    float: right;
    margin-top: 0.5rem;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 2rem);
    background-color: #1D1D1D;
    box-shadow: var(--nav-shadow);
    padding: 1rem;
    z-index: 30;
  }

  :global([data-theme=light]) header {
    background-color: #F5F5F5;
  }

  header h1 {
    font-size: 3rem;
  }

  :root {
    --transition-duration: 300ms !important;
  }
</style>
