/**
 * From svelte-materialify
 */

/* eslint-disable no-param-reassign */

/**
 * Options for customizing ripples
 */
const defaults = {
  disabled: false,
  color: 'currentColor',
  class: '',
  opacity: 0.1,
  centered: false,
  spreadingDuration: 'var(--ripple-duration)',
  spreadingDelay: '0s',
  spreadingTimingFunction: 'linear',
  clearingDuration: 'calc(var(--ripple-duration) + 600ms)',
  clearingDelay: '0s',
  clearingTimingFunction: 'ease-in-out',
};

/** @typedef {typeof defaults} RippleOptions */

/**
 * Creates a ripple element but does not destroy it (use RippleStop for that)
 *
 * @param {TouchEvent | MouseEvent | KeyboardEvent} e
 * @param {Partial<RippleOptions>} options
 * @returns Ripple element
 */
function RippleStart(e, options = {}) {
  e.stopImmediatePropagation();
  const opts = { ...defaults, ...options };

  /** @type {(e: Event) => e is TouchEvent} */
  // @ts-ignore
  const computeIsTouchEvent = (e) => (e.touches ? e.touches.length : false);

  const isTouchEvent = computeIsTouchEvent(e);
  // Parent element
  const target = /** @type {HTMLElement} */ (
    isTouchEvent ? e.touches[0].target : e.currentTarget
  );

  // Create ripple
  const ripple = document.createElement('div');
  const rippleStyle = ripple.style;

  // Adding default stuff
  ripple.className = `material-ripple ${opts.class}`;
  rippleStyle.position = 'absolute';
  rippleStyle.color = 'inherit';
  rippleStyle.borderRadius = '50%';
  rippleStyle.pointerEvents = 'none';
  rippleStyle.width = '100px';
  rippleStyle.height = '100px';
  rippleStyle.marginTop = '-50px';
  rippleStyle.marginLeft = '-50px';
  if (!opts.disabled) target.appendChild(ripple);
  rippleStyle.opacity = `${opts.opacity}`;
  rippleStyle.transition = `transform ${opts.spreadingDuration} ${opts.spreadingTimingFunction} ${opts.spreadingDelay},opacity ${opts.clearingDuration} ${opts.clearingTimingFunction} ${opts.clearingDelay}`;
  rippleStyle.transform = 'scale(0) translate(0,0)';
  rippleStyle.background = opts.color;

  // Positioning ripple
  // idk why but this needs to be setTimeouted or it doesn't work for selects
  setTimeout(() => {
    const targetRect = target.getBoundingClientRect();
    /** @type {(e: Event) => e is KeyboardEvent} */
    const isKeyboardEvent = (e) => opts.centered;
    if (isKeyboardEvent(e)) {
      rippleStyle.top = `${targetRect.height / 2}px`;
      rippleStyle.left = `${targetRect.width / 2}px`;
    } else {
      const distY = isTouchEvent ? e.touches[0].clientY : e.clientY;
      const distX = isTouchEvent ? e.touches[0].clientX : e.clientX;
      rippleStyle.top = `${distY - targetRect.top}px`;
      rippleStyle.left = `${distX - targetRect.left}px`;
    }

    // Enlarge ripple
    rippleStyle.transform = `scale(${
      Math.max(targetRect.width, targetRect.height) * 0.02
    }) translate(0,0)`;
  });
  return ripple;
}

/**
 * Destroys the ripple, slowly fading it out.
 *
 * @param {HTMLElement} ripple
 * @return {Promise<void>}
 */
function RippleStop(ripple) {
  return new Promise((res, rej) => {
    if (ripple) {
      ripple.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'opacity') {
          ripple.remove();
          res();
        }
      });
      ripple.style.opacity = '0';
    } else {
      rej();
    }
  });
}

/**
 * @param {HTMLElement} node
 * @param {Partial<RippleOptions>} _options
 * @returns {{
 *  update: (newOptions: Partial<RippleOptions>) => void, destroy: () => void
 * }}
 */
export default (node, _options = {}) => {
  let options = _options;
  let destroyed = false;
  /** @type {Set<HTMLElement>} */
  const ripples = new Set();
  let keyboardActive = false;
  /** @type {(e: KeyboardEvent | TouchEvent | MouseEvent) => void} */
  const handleStart = (e) => {
    ripples.add(RippleStart(e, options));
  };
  const handleStop = () =>
    ripples.forEach((r) => r && RippleStop(r).then(() => ripples.delete(r)));
  /** @type {(e: KeyboardEvent) => void} */
  const handleKeyboardStart = (e) => {
    if (!keyboardActive && (e.keyCode === 13 || e.keyCode === 32)) {
      ripples.add(RippleStart(e, { ...options, centered: true }));
      keyboardActive = true;
    }
  };
  const handleKeyboardStop = () => {
    keyboardActive = false;
    handleStop();
  };

  function setup() {
    node.classList.add('s-ripple-container');
    node.addEventListener('pointerdown', handleStart);
    node.addEventListener('pointerup', handleStop);
    node.addEventListener('touchstart', handleStart);
    node.addEventListener('touchend', handleStop);
    node.addEventListener('pointerleave', handleStop);
    node.addEventListener('keydown', handleKeyboardStart);
    node.addEventListener('keyup', handleKeyboardStop);
    destroyed = false;
  }

  function destroy() {
    node.classList.remove('s-ripple-container');
    node.removeEventListener('pointerdown', handleStart);
    node.removeEventListener('pointerup', handleStop);
    node.removeEventListener('touchstart', handleStart);
    node.removeEventListener('touchend', handleStop);
    node.removeEventListener('pointerleave', handleStop);
    node.removeEventListener('keydown', handleKeyboardStart);
    node.removeEventListener('keyup', handleKeyboardStop);
    destroyed = true;
  }

  if (options) setup();

  return {
    update(newOptions) {
      options = newOptions;
      if (options && destroyed) setup();
      else if (!(options || destroyed)) destroy();
    },
    destroy,
  };
};
