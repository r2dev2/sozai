<script>
  import { Slider } from '..';
  import Example from './Example.svelte';
  import Examples from './Examples.svelte';

  let value = 50;

  $: console.log('slider value:', value);
</script>

<Examples name="Slider" filename="Slider.svelte">
  <Example name="basic-slider">
    <Slider min={0} max={100} bind:value />
  </Example>
</Examples>
