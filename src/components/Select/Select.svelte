<script>
  import TextField from '../TextField/TextField.svelte';

  export let label = '';
  export let items = [{ value: 0, text: 'sample' }].slice(1);
</script>

<div class="s-component s-select">
  <TextField {label} />
</div>
