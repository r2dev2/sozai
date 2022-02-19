export const exampleApp = `
<!-- Root app -->
<script>
  import { SozaiApp } from 'sozai';
</script>

<SozaiApp>
  <!-- Your app -->
</SozaiApp>

<style>
  :root {
    /* Override --primary-color, '!imporant' is necessary */
    --primary-color: var(--red) !important;
  }
</style>
`.trim();

export const exampleTheming = `
<script>
  import { onMount } from 'svelte';
  import { theme } from 'sozai';

  onMount(() =>{ 
    theme.set('dark'); // can set to light, dark, or whatever your custom theme is named
  });
</script>
<style>
  :root[data-theme=dark] { /* data-theme="theme name" */
    --app-bg-color: #212121 !important;
  }

  :root[data-theme=custom-theme] {
    --app-bg-color: var(--red) !important;
  }
</style>
`.trim();

export const exampleFilenameKey = Symbol();
