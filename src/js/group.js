import { noop } from 'svelte/internal';
import { derived, get, readable, writable } from 'svelte/store';

/**
 * @template T
 * @typedef {import('svelte/store').Readable<T>} Readable<T>
 */
/**
 * @template T
 * @typedef {import('svelte/store').Writable<T>} Writable<T>
 */

/** @typedef {'destroy' | 'click'} GroupMSGType */
/** @typedef {{ type: GroupMSGType, element: Element }} GroupMSG */
/** @typedef {{ type: 'is-parent', element: Element}} ParentConfirmMSG*/
/** @typedef {{ type: 'set-selected', selected: boolean }} SetSelectedMSG */
/** @typedef {ParentConfirmMSG | SetSelectedMSG} GroupItemMSG */
/** @typedef {{ key: symbol, element: Element }} ChildCreate */

/** @type {Map<Element, Writable<GroupMSG | null>>} */
const groups = new Map();

/** @type {Map<Element, Writable<GroupItemMSG | null>>} */
const groupItems = new Map();

/** @type {(e: any) => e is CustomEvent<ChildCreate>} */
const isChildCreateEvent = (e) =>
  e.detail && 'key' in e.detail && 'element' in e.detail;

/** @type {(n1: Element, n2: Element) => number} */
const documentPositionComparator = (n1, n2) =>
  n1.compareDocumentPosition(n2) === 4 ? -1 : 1;

/**
 * Parent of a selectable group.
 *
 * @param {symbol} key group key
 * @param {Element} element element representing group parent
 * @param {Readable<boolean>} selectable whether group is selectable
 * @param {Readable<boolean>} multiselect whether to allow multiselect
 * @param {Writable<number[]>} selected indexes that are selected
 * @returns {{ destroy: VoidFunction  }}
 */
export const group = (key, element, selectable, multiselect, selected) => {
  /** @type {Writable<GroupMSG | null>} */
  const channel = writable();
  groups.set(element, channel);

  const unsortedChildren = writable(/** @type {Element[]} */ ([]));
  const children = derived(unsortedChildren, ($c) =>
    [...$c].sort(documentPositionComparator)
  );
  const childrenIndex = derived(
    children,
    ($children) => new Map($children.map((child, i) => [child, i]))
  );

  const cleanUpUpdateSelected = derived(
    [childrenIndex, selected],
    (x) => x
  ).subscribe(([$childrenIndex, $selected]) => {
    const selectedSet = new Set($selected);
    $childrenIndex.forEach((i, child) => {
      groupItems
        .get(child)
        ?.set({ type: 'set-selected', selected: selectedSet.has(i) });
    });
  });

  const cleanUpChannel = channel.subscribe((msg) => {
    if (!msg) return;
    if (msg.type === 'click') {
      if (!get(selectable)) return;
      const index = get(childrenIndex)?.get(msg.element);
      const currentlySelected = get(selected);
      if (index === undefined) return;
      const isCurrentlySelected = currentlySelected.includes(index);
      if (get(multiselect) && isCurrentlySelected) {
        selected.set(currentlySelected.filter((el) => el !== index));
        return;
      }
      if (get(multiselect)) {
        selected.set([...currentlySelected, index].sort());
        return;
      }
      selected.set([index]);
    }
  });

  /** @type {(e: Event) => void} */
  const onNewGroupItem = (e) => {
    if (isChildCreateEvent(e) && e.detail.key === key) {
      e.stopPropagation();
      unsortedChildren.set([...get(children), e.detail.element]);
      groupItems.get(e.detail.element)?.set({ type: 'is-parent', element });
    }
  };

  element.addEventListener('newGroupItem', onNewGroupItem);

  const destroy = () => {
    groups.delete(element);
    element.removeEventListener('newGroupItem', onNewGroupItem);
    cleanUpChannel();
    cleanUpUpdateSelected();
  };

  return { destroy };
};

/**
 * Selectable group item.
 *
 * @param {symbol} key group type key
 * @param {Element} element element associated with group item
 * @returns {{ destroy: VoidFunction, selected: Readable<boolean> }}
 */
export const groupItem = (key, element) => {
  /** @type {Writable<GroupItemMSG | null>} */
  const channel = writable(null);
  groupItems.set(element, channel);

  const selected = writable(false);
  const parent = readable(/** @type {Element | null} */ (null), (set) => {
    setTimeout(() => {
      element.dispatchEvent(
        new CustomEvent('newGroupItem', {
          detail: { key, element },
          bubbles: true,
          cancelable: true,
          composed: false,
        })
      );
    });

    return channel.subscribe((msg) => {
      if (!msg) return;
      if (msg.type === 'is-parent') {
        set(msg.element);
      }
    });
  });

  const parentFindCleanUp = parent.subscribe(noop);

  /** @type {(msg: GroupMSG) => void} */
  const sendParentMessage = (msg) => {
    const cleanUp = parent.subscribe((el) => {
      if (!el) return;
      groups.get(el)?.set(msg);
      setTimeout(() => cleanUp());
    });
  };

  const onClick = () => {
    sendParentMessage({ type: 'click', element });
  };

  element.addEventListener('click', onClick);

  const cleanUpChannel = channel.subscribe((msg) => {
    if (!msg) return;
    if (msg.type === 'set-selected') {
      selected.set(msg.selected);
    }
  });

  const destroy = () => {
    groupItems.delete(element);
    element.removeEventListener('click', onClick);
    cleanUpChannel();
    parentFindCleanUp();
    sendParentMessage({ type: 'destroy', element });
  };

  return { destroy, selected };
};
