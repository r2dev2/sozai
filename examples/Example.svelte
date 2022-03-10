<script>
  import Prism from 'prismjs';
  import 'prism-svelte';
  import 'prismjs/themes/prism.css';

  import { getContext } from 'svelte';

  import { getExample } from './example.js';
  import { exampleFilenameKey } from './constants.js';

  export let name = '';

  const filename = /** @type {string} */ (getContext(exampleFilenameKey));

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

  tr {
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (max-width: 600px) {
    tr {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 2rem;
      max-width: 90vw;
    }
  }
</style>
