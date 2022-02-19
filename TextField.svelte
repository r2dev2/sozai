<script>
  import { TextField } from '..';
  import Example from './Example.svelte';
  import Examples from './Examples.svelte';
</script>

<div>
  <Examples filename="TextField.svelte">
    <Example name="basic-textfield">
      <TextField label="Basic" />
    </Example>

    <Example name="dense-textfield">
      <TextField label="Dense" dense />
    </Example>

    <Example name="hint-textfield">
      <TextField label="Hint" hint="Test hint" persistentHint />
    </Example>

    <Example name="error-textfield">
      <TextField label="Error" error="Test error" />
    </Example>

    <Example name="outlined-textfield">
      <TextField label="Outlined" outlined />
    </Example>

    <Example name="dense-outlined-textfield">
      <TextField label="Outlined dense" outlined dense />
    </Example>

    <Example name="outlined-hint-textfield">
      <TextField label="Outlined with hint" outlined hint="Test hint" />
    </Example>

    <Example name="outlined-error-textfield">
      <TextField label="Outlined with error" outlined error="Test error" />
    </Example>

    <Example name="filled-textfield">
      <TextField label="Filled" filled />
    </Example>

    <Example name="basic-textarea-textfield">
      <TextField label="Basic textarea" textarea rows={4} />
    </Example>

    <Example name="outlined-textarea-textfield">
      <TextField
        label="Outlined textarea"
        textarea
        rows={4}
        outlined
        color="blue"
      />
    </Example>
  </Examples>
</div>

<style>
  div :global(.example-content) {
    padding-top: 1rem;
  }
</style>
