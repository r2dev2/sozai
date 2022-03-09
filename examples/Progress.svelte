<script>
  import { ProgressCircular } from '..';
  import Example from './Example.svelte';
  import Examples from './Examples.svelte';
</script>

<Examples name="Dialog" filename="Progress.svelte">
  <Example name="progress-indeterminate-round">
    <ProgressCircular indeterminate />
  </Example>

  <Example name="progress-indeterminate-round-props">
    <ProgressCircular indeterminate radius={40} thickness={10} color="green" />
  </Example>
</Examples>
