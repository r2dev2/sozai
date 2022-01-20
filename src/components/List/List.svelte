<script>
  import { createEventDispatcher, onMount, setContext } from 'svelte';

  export let selectable = false;
  export let multiselect = false;
  export let selected = [0].slice(1);

  let ul;
  /** @typedef {(e: MouseEvent) => void} MouseEventCB*/
  /** @type {Array<HTMLElement & { __sozaiListOnClick: MouseEventCB, setSelected: (s: boolean) => void, getSelected: () => boolean}} */
  let children = [];

  const dispatch = createEventDispatcher();

  const updateChildren = () => {
    children = [...ul.querySelectorAll(':scope > .s-listitem')];
    selected = children
      .map((el, i) => [el, i])
      .filter(([el]) => el?.getSelected())
      .map(([_el, i]) => i);
  };

  onMount(() => {
    const config = { childList: true };
    const observer = new MutationObserver(updateChildren);
    observer.observe(ul, config);
    updateChildren();
    setContext('list', {
      selectable, multiselect
    })
    return () => observer.disconnect();
  });

  // needed to trick svelte compiler from false circular dependency shhhh
  const updateSelected = u => selected = u;

  $: selectedSet = new Set(selected);
  $: selectedSet, children.forEach((child, i) => {
    child.setSelected(selectedSet.has(i));
    /** @type {(e: MouseEvent) => void}*/
    child.__sozaiListOnClick = e => {
      e.stopImmediatePropagation();
      if (child.getSelected() && selectedSet.has(i)) {
        updateSelected(selected.filter(s => s != i));
      }
      if (!child.getSelected() && !selectedSet.has(i)) {
        updateSelected([...selected, i].sort());
      }
      child.setSelected(!child.getSelected());
      dispatch('change', { selected });
    };
    child.removeEventListener('click', child.__sozaiListOnClick);
    child.addEventListener('click', child.__sozaiListOnClick);
  });
</script>

<ul bind:this={ul} class="s-component s-list">
  <slot />
</ul>

<style>
  .s-list {
    text-align: left;
  }
</style>
