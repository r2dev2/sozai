<script>
  import { Button, Dialog } from '..';

  let showDialog = false;
</script>

<Dialog bind:value={showDialog}>
  <h5 slot="title">What do you think?</h5>
  <p>I'm not sure about today's weather</p>
  <div slot="actions">
    <Button text on:click={() => showDialog = false}>Disagree</Button>
    <Button text on:click={() => showDialog = false}>Agree</Button>
  </div>
</Dialog>

<div>
  <Button color="blue" on:click={() => showDialog = true}>Show Dialog</Button>
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
