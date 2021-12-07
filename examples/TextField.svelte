<script>
  import { TextField } from '..';

  let value = '';
</script>

<div>
  <p>Entered: {value}</p>
  <TextField bind:value label="Test Label" />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: min(70%, 48rem);
  }
</style>
