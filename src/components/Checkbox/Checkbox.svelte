<script context="module">
  let amountCreated = 0;
</script>

<script>
  import { checkboxKey } from '../../js/constants.js';
  import { getColor } from '../../js/utils.js';
  import RadioCheckbox from '../Util/RadioCheckbox.svelte';
  import Icon from '../Icon/Icon.svelte';

  export let color = 'var(--primary-color)';
  export let value = '';
  export let id = '';
  export let selected = false;

  $: if (id === '') {
    id = `s-checkbox-${amountCreated++}`;
  }
</script>

<RadioCheckbox
  key={checkboxKey}
  color={getColor(color)}
  inactiveColor="var(--radio-inactive-color)"
  {id}
  {value}
  type="checkbox"
  role="checkbox"
  bind:selected
>
  <svelte:fragment slot="prepend">
    <slot name="prepend">
      <Icon color="var(--icon-color)">
        {selected ? 'check_box' : 'check_box_outline_blank'}
      </Icon>
    </slot>
  </svelte:fragment>
  <slot />
</RadioCheckbox>
