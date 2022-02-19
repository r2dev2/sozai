<script>
  import { setContext } from 'svelte';
  import { exampleFilenameKey } from './constants';

  export let name = '';
  export let filename = '';

  setContext(exampleFilenameKey, filename);
</script>

<table>
  <tr>
    <th>{name}</th>
    <th>Code</th>
  </tr>
  <slot />
</table>

<style>
  table {
    width: 100%;
  }

  tr {
    display: none;
  }
</style>
