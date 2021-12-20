<script>
  import { TextField } from '..';
  import Example from './Example.svelte';
  import Examples from './Examples.svelte';

  const filename = 'TextField.svelte';
</script>

<div>
  <Examples>
    <Example name="basic-textfield" {filename}>
      <TextField label="Basic" />
    </Example>
    <Example name="hint-textfield" {filename}>
      <TextField label="Hint" hint="Test hint" persistentHint />
    </Example>
    <Example name="error-textfield" {filename}>
      <TextField label="Error" error="Test error" />
    </Example>
    <Example name="outlined-textfield" {filename}>
      <TextField label="Outlined" outlined />
    </Example>
    <Example name="outlined-hint-textfield" {filename}>
      <TextField label="Outlined with hint" outlined hint="Test hint" />
    </Example>
    <Example name="outlined-error-textfield" {filename}>
      <TextField label="Outlined with error" outlined error="Test error" />
    </Example>
    <Example name="basic-textarea-textfield" {filename}>
      <TextField label="Basic textarea" textarea rows="4" />
    </Example>
    <Example name="outlined-textarea-textfield" {filename}>
      <TextField label="Outlined textarea" textarea rows="4" outlined color="blue" />
    </Example>
  </Examples>
</div>

<style>
  div :global(.example-content) {
    padding-top: 1rem;
  }
</style>
