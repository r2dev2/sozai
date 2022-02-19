<script>
  import { Select } from '..';
  import Example from './Example.svelte';
  import Examples from './Examples.svelte';

  const items = [
    { value: 1, text: 'one' },
    { value: 2, text: 'two' },
    { value: 3, text: 'three' },
    { value: 4, text: 'four' },
  ];
</script>

<Examples name="Select" filename="Select.svelte">
  <Example name="standard-select">
    <Select label="Standard" {items} />
  </Example>

  <Example name="dense-select">
    <Select label="Dense" dense {items} />
  </Example>

  <Example name="outlined-select">
    <Select label="Outlined" outlined {items} />
  </Example>

  <Example name="dense-outlined-select">
    <Select label="Outlined Dense" outlined dense {items} />
  </Example>
</Examples>
