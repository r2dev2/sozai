<script>
  import { List, ListItem } from '..';
  import Example from './Example.svelte';
  import Examples from './Examples.svelte';
</script>

<Examples name="List" filename="List.svelte">
  <Example name="basic-list">
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

  <Example name="icon-list">
    <!-- Use the select prop to allow selection of items -->
    <!-- May also bind:selected -->
    <List selectable on:change={(e) => console.log(e.detail.selected)}>
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
  <Example name="multiselect-icon-list">
    <!-- Use the multiselect prop to allow selection of multiple items-->
    <List
      multiselect
      selectable
      on:change={(e) => console.log(e.detail.selected)}
    >
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
