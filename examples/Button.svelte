<script>
  import { Button } from '..';
  import Example from './Example.svelte';
  import Examples from './Examples.svelte';

  const filename = 'Button.svelte';
</script>

<Examples name="Button">
  <Example name="basic-button" {filename}>
    <Button>
      Basic Button
    </Button>
  </Example>

  <Example name="light-button" {filename}>
    <Button light>
      Light Button
    </Button>
  </Example>
  
  <Example name="dark-button" {filename}>
    <Button dark>
      Dark Button
    </Button>
  </Example>

  <Example name="bloc-button" {filename}>
    <Button color="alert" dark block>
      Block Button
    </Button>
  </Example>

  <Example name="outlined-button" {filename}>
    <Button color="green" light block outlined>
      Outlined Button
    </Button>
  </Example>

  <Example name="text-button" {filename}>
    <Button text>
      Text Button
    </Button>
  </Example>

  <Example name="disabled-button" {filename}>
    <Button block disabled>
      Disabled Button
    </Button>
  </Example>

  <Example name="fab-button" {filename}>
    <!-- Fab button -->
    <Button color="alert" icon="change_history" />
  </Example>

  <Example name="dense-fab-button" {filename}>
    <!-- Dense fab button -->
    <Button color="green" icon="change_history" dense />
  </Example>

  <Example name="clearbg-fab-button" {filename}>
    <!-- Clear background button -->
    <Button color="error" icon="change_history" text light flat dense />
  </Example>

</Examples>
