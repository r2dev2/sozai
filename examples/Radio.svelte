<script>
  import { Radio, RadioGroup } from '..';
  import Example from './Example.svelte';
  import Examples from './Examples.svelte';

  /** @type {number | null}*/
  let num = null;
</script>

<Examples name="Radio" filename="Radio.svelte">
  <Example name="standard-radio">
    <!-- Default Radio -->
    <RadioGroup
      bind:selected={num}
      on:change={(e) => console.log(num, e.detail.selected)}
    >
      <Radio>Radio 1</Radio>
      <Radio>Radio 2</Radio>
      <Radio>Radio 3</Radio>
    </RadioGroup>
  </Example>

  <Example name="colored-radio">
    <!-- Radios can be of different colors -->
    <RadioGroup>
      <Radio color="blue">Radio 1</Radio>
      <Radio color="red">Radio 2</Radio>
      <Radio color="green">Radio 3</Radio>
    </RadioGroup>
  </Example>
</Examples>
