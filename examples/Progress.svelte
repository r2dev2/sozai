<script>
  import { ProgressCircular } from '..';
  import Example from './Example.svelte';
  import Examples from './Examples.svelte';

  let showFirstDialog = false;
  let showSecondDialog = false;
</script>

<Examples name="Dialog" filename="Progress.svelte">
  <Example name="progress-indeterminate-round">
    <ProgressCircular indeterminate />
  </Example>
</Examples>
