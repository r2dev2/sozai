<script>
  import Prism from 'prismjs';
  import 'prism-svelte';
  import 'prismjs/themes/prism.css';

  import { getExample } from './example.js';

  export let filename = '';
  export let name = '';


  $: exampleSource = getExample(filename, name);

</script>

<tr>
  <td class="example-content">
    <slot />
  </td>
  <td class="example-src">
    <pre class="language-svelte">
      {@html Prism.highlight($exampleSource, Prism.languages.svelte, 'svelte')}
    </pre>
  </td>
</tr>

<style>
  .example-content {
    text-align: center;
  }
</style>
