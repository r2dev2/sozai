<script>
  import { Button } from '../src';
</script>

<div>
  <Button>
    Basic Button
  </Button>
  
  <Button light>
    Light Button
  </Button>
  
  <Button dark>
    Dark Button
  </Button>

  <Button color="alert" dark block>
    Block Button
  </Button>

  <Button color="secondary" light block outlined>
    Outlined Button
  </Button>

  <Button block disabled>
    Disabled Button
  </Button>

  <Button color="alert" icon="change_history" />

  <Button color="error" icon="change_history" text light flat />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
