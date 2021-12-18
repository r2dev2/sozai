<script>
  import Prism from 'prismjs';
  import 'prismjs/themes/prism.css';

  import { getExample } from './example.js';

  export let filename = '';
  export let name = '';


  $: exampleSource = getExample(filename, name);

</script>

<div class="example">
  <div class="example-content">
    <slot />
  </div>
  <div class="example-src">
    <pre class="language-html">
      {@html Prism.highlight($exampleSource, Prism.languages.html)}
    </pre>
  </div>
</div>
