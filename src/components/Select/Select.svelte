<script>
  import { createEventDispatcher } from 'svelte';

  import TextField from '../TextField/TextField.svelte';
  import List from '../List/List.svelte';
  import ListItem from '../List/ListItem.svelte';
  import Icon from '../Icon/Icon.svelte';
  import Scrim from '../Util/Scrim.svelte';

  export let label = '';
  export let active = false;
  /** @type {number | null} */
  export let value = null;
  export let items = [{ text: 'sample' }].slice(1);
  export let outlined = false;
  export let dense = false;

  const dispatch = createEventDispatcher();

  /** @type {Set<HTMLElement>} */
  const activeTransformTransitionRipples = new Set();

  const deactivate = () => {
    if (activeTransformTransitionRipples.size) {
      for (const ripple of activeTransformTransitionRipples) {
        ripple.addEventListener('transitionend', () => (active = false));
      }
    } else {
      active = false;
    }
  };

  /** @type {(num: number) => void}*/
  const selectValue = (num) => {
    value = num;
    dispatch('change', { value });
    deactivate();
  };

  /** @type {(e: TransitionEvent) => void} */
  const onTransitionStart = (e) => {
    const target = /** @type {HTMLElement}*/ (e.target);
    if (
      e.propertyName === 'transform' &&
      target.classList.contains('material-ripple')
    ) {
      activeTransformTransitionRipples.add(target);
    }
  };

  /** @type {(e: TransitionEvent) => void} */
  const onTransitionEnd = (e) => {
    if (e.propertyName === 'transform') {
      activeTransformTransitionRipples.delete(
        /** @type {HTMLElement} */ (e.target)
      );
    }
  };

  /** @type {(e: MouseEvent) => void} */
  const onTextFieldClick = e => {
    e.preventDefault();
    e.stopPropagation();
    active = true;
  };

  // chrome unfocuses textfields when selected so we need to manually 1-way bind
  $: active_ = active;
  $: if (active_ !== active) {
    active_ = active;
  }
</script>

<div
  class="s-component s-select"
  class:active
  class:outlined
  on:transitionstart={onTransitionStart}
  on:transitionend={onTransitionEnd}
>
  <TextField
    value={items[value ?? -1]?.text ?? ''}
    bind:disabled={active_}
    bind:focused={active_}
    on:click={onTextFieldClick}
    {label}
    {outlined}
    {dense}
  />

  <div class="dropdown-icon">
    <Icon>arrow_drop_down</Icon>
  </div>

  {#if active}
    <Scrim opacity={0} notransition on:click={deactivate} />
    <div class="options fade-in">
      <List
        selectable
        selected={value !== null ? [value] : []}
        on:change={(e) => selectValue(e.detail.selected[0])}
      >
        {#each items as item}
          <ListItem>
            {item.text}
          </ListItem>
        {/each}
      </List>
    </div>
  {/if}
</div>

<style>
  .s-select {
    --fade-duration: var(--select-activate-duration);
    position: relative;
  }

  .dropdown-icon {
    position: absolute;
    top: 50%;
    right: 0.25rem;
    transform: perspective(1px) translateY(-50%);
  }

  .s-select.outlined .dropdown-icon {
    right: 1.5rem;
  }

  .dropdown-icon :global(i) {
    vertical-align: middle;
    transition: var(--select-activate-duration) ease-out;
  }

  .s-select.active > .dropdown-icon :global(i) {
    color: var(--primary-color);
    transform: rotate(180deg);
  }

  .s-select :global(.s-list) {
    position: absolute;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.5rem 0;
    margin: 0;
    background-color: var(--app-bg-color);
    box-shadow: var(--select-shadow);
  }

  .s-select :global(.s-listitem) {
    padding: 0.75rem 1rem;
  }

  .s-select :global(.s-input) {
    caret-color: transparent;
  }

  .s-select :global(.s-input:hover) {
    cursor: pointer;
  }
</style>
