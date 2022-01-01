<script>
  import Prism from 'prismjs';

  import { Button, theme } from '..';
  import Example from './Example.svelte';
  import Examples from './Examples.svelte';

  const filename = 'CustomTheme.svelte';
</script>

<pre class="language-svelte">
  <code>
    {@html Prism.highlight(`
<script>
  import { Button, theme } from 'sozai'
</script>`.trim(), Prism.languages.svelte, 'svelte')}
  </code>
</pre>

<h4>Theming</h4>
<p>Sozai uses a theming store to switch themes. By default, the two themes are 'light' and 'dark'.</p>

<Examples>
  <Example name="dark-mode-toggle" {filename}>
    <Button
      color={$theme == 'dark' ? 'white' : 'black'}
      icon="wb_sunny"
      on:click={() => theme.set($theme == 'dark' ? 'light' : 'dark')}
      text light flat dense
    />
  </Example>
</Examples>
