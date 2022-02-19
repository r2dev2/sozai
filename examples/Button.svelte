<script>
  import { Button } from '..';
  import Example from './Example.svelte';
  import Examples from './Examples.svelte';
</script>

<Examples name="Button" filename="Button.svelte">
  <Example name="basic-button">
    <Button>Basic Button</Button>
  </Example>

  <Example name="light-button">
    <Button light>Light Button</Button>
  </Example>

  <Example name="dark-button">
    <Button dark>Dark Button</Button>
  </Example>

  <Example name="bloc-button">
    <Button color="alert" dark block>Block Button</Button>
  </Example>

  <Example name="outlined-button">
    <Button color="green" light block outlined>Outlined Button</Button>
  </Example>

  <Example name="text-button">
    <Button text>Text Button</Button>
  </Example>

  <Example name="disabled-button">
    <Button block disabled>Disabled Button</Button>
  </Example>

  <Example name="fab-button">
    <!-- Fab button -->
    <Button color="alert" icon="change_history" />
  </Example>

  <Example name="dense-fab-button">
    <!-- Dense fab button -->
    <Button color="green" icon="change_history" dense />
  </Example>

  <Example name="clearbg-fab-button">
    <!-- Clear background button -->
    <Button color="error" icon="change_history" text light flat dense />
  </Example>
</Examples>
