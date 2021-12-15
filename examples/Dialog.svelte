<script>
  import { Button, Dialog } from '..';

  let showFirstDialog = false;
  let showSecondDialog = false;
</script>

<Dialog bind:value={showFirstDialog}>
  <h5 slot="title">What do you think?</h5>
  <p>I'm not sure about today's weather</p>
  <div slot="actions">
    <Button text on:click={() => showFirstDialog = false}>Disagree</Button>
    <Button text on:click={() => showFirstDialog = false}>Agree</Button>
  </div>
</Dialog>

<Dialog persistent bind:value={showSecondDialog}>
  <h5 slot="title">Do you think you can close me by clicking outside?</h5>
  <p>Dewit</p>
  <div slot="actions">
    <Button text on:click={() => showSecondDialog = false}>Hehe boi</Button>
  </div>
</Dialog>

<div>
  <Button color="blue" on:click={() => showFirstDialog = true}>Show Dialog</Button>
  <Button color="green" on:click={() => showSecondDialog = true}>Show Persistent Dialog</Button>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  [slot=actions] {
    flex-direction: row;
  }
</style>
