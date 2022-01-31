<script>
  import Example from './Example.svelte';
  import Examples from './Examples.svelte';

  const filename = 'Typography.svelte';
</script>

<Examples>
  <Example name="h1" {filename}>
    <h1>Header 1</h1>
  </Example>

  <Example name="h2" {filename}>
    <h2>Header 2</h2>
  </Example>

  <Example name="h3" {filename}>
    <h3>Header 3</h3>
  </Example>

  <Example name="h4" {filename}>
    <h4>Header 4</h4>
  </Example>

  <Example name="h5" {filename}>
    <h5>Header 5</h5>
  </Example>

  <Example name="h6" {filename}>
    <h6>Header 6</h6>
  </Example>

  <Example name="subtitle-1" {filename}>
    <p class="subtitle-1">Subtitle 1</p>
  </Example>

  <Example name="subtitle-2" {filename}>
    <p class="subtitle-2">Subtitle 2</p>
  </Example>

  <Example name="body-1" {filename}>
    <p class="body-1">Body 1</p>
  </Example>

  <Example name="body-2" {filename}>
    <p class="body-2">Body 2</p>
  </Example>

  <Example name="caption" {filename}>
    <p class="caption">Caption</p>
  </Example>
</Examples>
