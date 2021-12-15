<script>
  import { SozaiApp } from '../src';
  import Button from './Button.svelte';
  import TextField from './TextField.svelte';
  import Dialog from './Dialog.svelte';

  const components = {
    button: Button,
    textfield: TextField,
    dialog: Dialog
  }

  let toShow = new URLSearchParams(location.search).get('com');

  $: if (!components[toShow]) {
    toShow = 'button';
  }

  $: component = components[toShow];
</script>

<SozaiApp>
  <label for="to-demo">Component to demo</label>
  <select bind:value={toShow} name="to-demo">
    {#each Object.keys(components) as value}
      <option {value}>{value}</option>
    {/each}
  </select>
  <div>
    <svelte:component this={component} />
  </div>
</SozaiApp>

<style>
  div {
    padding-top: 1rem;
  }
</style>
