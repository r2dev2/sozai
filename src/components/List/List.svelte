<script>
  import { createEventDispatcher, onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { listKey } from '../../js/constants.js';
  import { group } from '../../js/group.js';

  export let selectable = false;
  export let multiselect = false;
  export let selected = [0].slice(1);

  /** @type {Element | undefined}*/
  let ul;
  /** @typedef {(e: MouseEvent) => void} MouseEventCB*/
  /** @typedef {HTMLElement & {
    __sozaiListOnClick: MouseEventCB,
    setSelected: (s: boolean) => void,
    getSelected: () => boolean
  }} SListItem */

  /** @type {Array<Element | SListItem>} */
  let children = [];

  const isSelectable = writable(selectable);
  const isMultiselect = writable(multiselect);

  $: isSelectable.set(selectable);
  $: isMultiselect.set(multiselect);

  setContext(listKey, {
    selectable: isSelectable,
    multiselect: isMultiselect,
  });

  const dispatch = createEventDispatcher();

  /** @type {(el: Element) => el is SListItem}*/
  const isSListItem = (el) => 'setSelected' in el;

  const updateChildren = () => {
    if (!ul) return;
    children = [...ul.querySelectorAll(':scope > .s-listitem')];
    selected = children
      .map((el, i) => /** @type {[typeof children[0], number]} */ ([el, i]))
      .filter(([el]) => (isSListItem(el) ? el.getSelected() : false))
      .map(([_el, i]) => i);
  };

  onMount(() => {
    if (!ul) return;
    const config = { childList: true };
    const observer = new MutationObserver(updateChildren);
    observer.observe(ul, config);
    updateChildren();
    return () => observer.disconnect();
  });

  onMount(() => {
    if (!ul) return;
    const { destroy, selected } = group(
      listKey,
      ul,
      isSelectable,
      isMultiselect
    );

    const sSub = selected.subscribe((s) => console.log('LIST SELECTED', s));

    return () => {
      sSub();
      destroy();
    };
  });

  // needed to trick svelte compiler from false circular dependency shhhh
  /** @type {(u: typeof selected) => any}*/
  const updateSelected = (u) => (selected = u);

  $: selectedSet = new Set(selected);
  $: selectedSet,
    children.forEach((child, i) => {
      if (!isSListItem(child)) return;
      child.setSelected(selectedSet.has(i));
      /** @type {(e: MouseEvent) => void}*/
      child.__sozaiListOnClick = (e) => {
        if (!selectable) return;
        e.stopImmediatePropagation();
        if (child.getSelected() && selectedSet.has(i) && multiselect) {
          updateSelected(selected.filter((s) => s !== i));
        }
        if (!child.getSelected() && !selectedSet.has(i)) {
          updateSelected([...selected, i].sort());
        }
        if (!multiselect && selected.includes(i)) {
          selected
            .filter((s) => s !== i)
            .map((s) => children[s])
            .filter(isSListItem)
            .forEach((c) => c.setSelected(false));
          updateSelected([i]);
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
