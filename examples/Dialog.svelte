<script>
  import { Button, Dialog } from '..';
  import Example from './Example.svelte';
  import Examples from './Examples.svelte';

  const filename = 'Dialog.svelte';
  let showFirstDialog = false;
  let showSecondDialog = false;
</script>

<Examples>
  <Example name="basic-dialog" {filename}>
    <!-- showFirstDialog declared beforehand -->
    <Dialog bind:value={showFirstDialog}>
      <h5 slot="title">What do you think?</h5>
      <p>I'm not sure about today's weather</p>
      <div slot="actions">
        <Button text on:click={() => (showFirstDialog = false)}>Disagree</Button
        >
        <Button text on:click={() => (showFirstDialog = false)}>Agree</Button>
      </div>
    </Dialog>

    <!-- Activator Button -->
    <Button on:click={() => (showFirstDialog = true)}>Show Dialog</Button>
  </Example>

  <Example name="persistent-dialog" {filename}>
    <Dialog persistent bind:value={showSecondDialog}>
      <h5 slot="title">Do you think you can close me by clicking outside?</h5>
      <p>Dewit</p>
      <div slot="actions">
        <Button text on:click={() => (showSecondDialog = false)}
          >Hehe boi</Button
        >
      </div>
    </Dialog>

    <!-- Activator Button -->
    <Button color="green" on:click={() => (showSecondDialog = true)}
      >Show Persistent Dialog</Button
    >
  </Example>
</Examples>

<style>
  h5,
  p {
    text-align: left;
  }
</style>
