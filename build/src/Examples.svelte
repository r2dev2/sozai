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
    max-width: 100%;
  }

  tr {
    display: none;
  }

  @media screen and (max-width: 600px) {
    table {
      padding-top: 3.5rem;
    }
  }
</style>
