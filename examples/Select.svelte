<script>
  import { Select } from '..';
  import Example from './Example.svelte';
  import Examples from './Examples.svelte';

  const filename = 'Select.svelte';

  const items = [
    { value: 1, text: 'one' },
    { value: 2, text: 'two' },
    { value: 3, text: 'three' },
    { value: 4, text: 'four' },
  ];
</script>

<Examples name="Select">
  <Example name="standard-select" {filename}>
    <Select label="Standard" {items} />
  </Example>

  <Example name="dense-select" {filename}>
    <Select label="Dense" dense {items} />
  </Example>

  <Example name="outlined-select" {filename}>
    <Select label="Outlined" outlined {items} />
  </Example>

  <Example name="dense-outlined-select" {filename}>
    <Select label="Outlined Dense" outlined dense {items} />
  </Example>
</Examples>
