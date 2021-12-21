<script>
  import { getCssDocs } from './example.js';

  const docs = getCssDocs();
  $: console.log($docs);
</script>
