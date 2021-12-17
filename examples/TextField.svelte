<script>
  import { TextField } from '..';

  let value = '';
</script>

<div>
  <p>Entered: {value}</p>
  <TextField bind:value label="Basic" />
  <TextField label="Hint" hint="Test hint" persistentHint color="blue" />
  <TextField label="Error" error="Test error" />
  <TextField label="Outlined" outlined />
  <TextField label="Outlined with hint" outlined hint="Test hint" />
  <TextField label="Outlined with error" outlined error="Test error" />
  <TextField label="Outlined textarea" textarea rows="5" outlined />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: min(70%, 48rem);
  }
</style>
