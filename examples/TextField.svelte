<script>
  import { TextField } from '..';

  let value = '';
</script>

<div>
  <p>Entered: {value}</p>
  <TextField bind:value label="Test Label" />
  <TextField label="Test Label (with hint)" hint="Test hint" persistentHint color="blue" />
  <TextField label="Test Label (with error)" error="Test error" />
  <TextField label="Test label (outlined)" outlined />
  <TextField label="Test label (outlined with hint)" outlined hint="Test hint" />
  <TextField label="Test label (outlined with error)" outlined error="Test error" />
  <TextField label="Test label (outlined textarea)" textarea rows="5" outlined />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: min(70%, 48rem);
  }
</style>
