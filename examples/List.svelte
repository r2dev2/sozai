<script>
  import { List, ListItem } from '..';
  import Example from './Example.svelte';
  import Examples from './Examples.svelte';

  const filename = 'List.svelte';
</script>

<Examples name="List">
  <Example name="basic-list" {filename}>
    <List>
      <ListItem>
        <div slot="title">Single-line item</div>
      </ListItem>
      <ListItem>
        <div slot="title">Double-line item</div>
        <div slot="subtitle">Secondary text</div>
      </ListItem>
    </List>
  </Example>

  <Example name="icon-list" {filename}>
    <!-- May also bind:selected -->
    <List on:change={e => console.log(e.detail.selected)}>
      <ListItem icon="schedule">
        <div slot="title">Real-Time</div>
      </ListItem>
      <ListItem icon="person">
        <div slot="title">Audience</div>
      </ListItem>
      <ListItem icon="flag">
        <div slot="title">Conversions</div>
      </ListItem>
    </List>
  </Example>
</Examples>
