<script>
  import { Radio, RadioGroup } from '..';
  import Example from './Example.svelte';
  import Examples from './Examples.svelte';

  const filename = 'Radio.svelte';
</script>

<Examples name="Radio">
  <Example name="standard-radio" {filename}>
    <RadioGroup>
      <Radio>Radio 1</Radio>
      <Radio>Radio 2</Radio>
      <Radio>Radio 3</Radio>
    </RadioGroup>
  </Example>
</Examples>
