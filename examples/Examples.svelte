<script>
  export let name = '';
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
