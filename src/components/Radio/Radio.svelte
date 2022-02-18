<script context="module">
  let amountCreated = 0;
</script>

<script>
  import { radioKey } from '../../js/constants.js';
  import { getColor } from '../../js/utils.js';
  import RadioCheckbox from '../Util/RadioCheckbox.svelte';
  import Icon from '../Icon/Icon.svelte';

  export let color = 'var(--primary-color)';
  export let value = '';
  export let id = '';
  export let selected = false;

  $: if (id === '') {
    id = `s-radio-${amountCreated++}`;
  }
</script>

<RadioCheckbox
  key={radioKey}
  color={getColor(color)}
  inactiveColor="var(--radio-inactive-color)"
  {id}
  {value}
  type="radio"
  role="radio"
  bind:selected
>
  <svelte:fragment slot="prepend">
    <slot name="prepend">
      <Icon color="var(--icon-color)">
        {selected ? 'radio_button_checked' : 'radio_button_unchecked'}
      </Icon>
    </slot>
  </svelte:fragment>
  <slot />
</RadioCheckbox>
