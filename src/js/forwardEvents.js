/**
 * From SMUI
 * https://github.com/hperrin/svelte-material-ui/blob/273ded17c978ece3dd87f32a58dd9839e5c61325/components/forwardEvents.js
 */

import { bubble, listen } from 'svelte/internal';

/**
 * @param {any} component
 * @param {string[]} additionalEvents
 * @returns {(node: HTMLElement) => { destroy: VoidFunction }}
 */
export function forwardEventsBuilder(component, additionalEvents = []) {
  const events = [
    'focus',
    'blur',
    'fullscreenchange',
    'fullscreenerror',
    'scroll',
    'cut',
    'copy',
    'paste',
    'keydown',
    'keypress',
    'keyup',
    'auxclick',
    'click',
    'contextmenu',
    'dblclick',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseover',
    'mouseout',
    'mouseup',
    'pointerlockchange',
    'pointerlockerror',
    'select',
    'wheel',
    'drag',
    'dragend',
    'dragenter',
    'dragstart',
    'dragleave',
    'dragover',
    'drop',
    'touchcancel',
    'touchend',
    'touchmove',
    'touchstart',
    'pointerover',
    'pointerenter',
    'pointerdown',
    'pointermove',
    'pointerup',
    'pointercancel',
    'pointerout',
    'pointerleave',
    'gotpointercapture',
    'lostpointercapture',
    ...additionalEvents,
  ];

  /**
   * @param {any} e
   */
  function forward(e) {
    bubble(component, e);
  }

  return (node) => {
    /** @type {Function[]} */
    const destructors = [];

    for (let i = 0; i < events.length; i++) {
      destructors.push(listen(node, events[i], forward));
    }

    return {
      destroy: () => {
        for (let i = 0; i < destructors.length; i++) {
          destructors[i]();
        }
      },
    };
  };
}
