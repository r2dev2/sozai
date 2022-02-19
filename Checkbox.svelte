<script>
  import { Checkbox, CheckboxGroup } from '..';
  import Example from './Example.svelte';
  import Examples from './Examples.svelte';

  /** @type {number[]}*/
  let nums = [];

  const filename = 'Checkbox.svelte';
</script>

<Examples name="Checkbox">
  <Example name="standard-checkbox" {filename}>
    <!-- Default Checkbox -->
    <CheckboxGroup
      bind:selected={nums}
      on:change={(e) => console.log(nums, e.detail.selected)}
    >
      <Checkbox>Checkbox 1</Checkbox>
      <Checkbox>Checkbox 2</Checkbox>
      <Checkbox>Checkbox 3</Checkbox>
    </CheckboxGroup>
  </Example>

  <Example name="colored-checkbox" {filename}>
    <!-- Checkboxes can be of different colors -->
    <CheckboxGroup>
      <Checkbox color="blue">Checkbox 1</Checkbox>
      <Checkbox color="red">Checkbox 2</Checkbox>
      <Checkbox color="green">Checkbox 3</Checkbox>
    </CheckboxGroup>
  </Example>
</Examples>
