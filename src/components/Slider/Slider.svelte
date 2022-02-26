<script context="module">
  console.warn('Slider is not finished yet');
</script>

<script>
  export let min = 0;
  export let max = 100;
  export let step = 1e-5;
  export let value = 50;

  let thumbHovered = false;
  let mouseIsDown = false;

  /** @type {HTMLElement | undefined}*/
  let thumbShadowEl;

  /** @type {(x: number, y: number) => void}*/
  const updateThumbHovered = (x, y) => {
    if (!thumbShadowEl) return;
    const boundingRect = thumbShadowEl.getBoundingClientRect();
    thumbHovered =
      x >= boundingRect.left &&
      x <= boundingRect.right &&
      y >= boundingRect.top &&
      y <= boundingRect.bottom;
  };

  /** @type {(e: MouseEvent) => void}*/
  const handleMouseMove = (e) => {
    if (!thumbShadowEl || mouseIsDown) return;
    updateThumbHovered(e.clientX, e.clientY);
  };

  /** @type {(e: TouchEvent) => void}*/
  const handleTouchStart = (e) => {
    if (!thumbShadowEl || mouseIsDown || e.touches[0] === undefined) return;
    mouseIsDown = true;
    updateThumbHovered(e.touches[0].clientX, e.touches[0].clientY);
  };

  $: filledPercent = (value - min) / (max - min);
  $: style = `--movable-dist: calc(100% - 0.75rem); --thumb-dist: calc(0.75rem + ${filledPercent} * var(--movable-dist));`;
</script>

<svelte:window
  on:mousemove={handleMouseMove}
  on:mousedown={() => (mouseIsDown = true)}
  on:touchstart={handleTouchStart}
  on:mouseup={() => (mouseIsDown = false)}
  on:touchend={() => (mouseIsDown = false)}
/>

<div
  class="s-component s-slider"
  class:chrome={navigator.userAgent.includes('Chrome')}
  {style}
>
  <div class="slider-container">
    <div
      bind:this={thumbShadowEl}
      class="thumb-shadow"
      class:hover={thumbHovered}
      class:clicked={thumbHovered && mouseIsDown}
    />
    <input type="range" {min} {max} {step} bind:value tabindex="0" />
  </div>
</div>

<style>
  .s-slider {
    --color: var(--primary-color);
    --thumb-size: 0.75rem;
    --thumb-hover-scale: 3.5;
    --thumb-clicked-scale: 4.5;
    --thumb-vertical-translate: calc(-50% - 1.5px);
    padding: 2rem;
  }

  .s-slider.chrome {
    --thumb-vertical-translate: -1.5px;
  }

  .slider-container {
    position: relative;
  }

  .thumb-shadow {
    position: absolute;
    font-size: 1rem;
    top: 50%;
    left: var(--thumb-dist);
    width: var(--thumb-size);
    height: var(--thumb-size);
    --transform: translate(
      calc(-50% - var(--thumb-size) / 2 + 1.5px),
      var(--thumb-vertical-translate)
    );
    transform: var(--transform);
    border-radius: 50%;
    opacity: 0.2;
    background: var(--color);
    pointer-events: none;
    transition: transform var(--slider-transition-duration) ease-out;
  }

  .thumb-shadow.hover {
    transform: var(--transform) scale(var(--thumb-hover-scale));
  }

  .thumb-shadow.clicked {
    transform: var(--transform) scale(var(--thumb-clicked-scale));
  }

  .s-slider input {
    width: 100%;
    background-color: transparent;
    -webkit-appearance: none;
    appearance: none;
  }

  /** Chrome*/
  .s-slider input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0.75rem;
    height: 0.75rem;
    background-color: var(--color);
    border-radius: 50%;
    border: none;
    transform: translateY(-50%);
  }

  .s-slider input::-webkit-slider-runnable-track {
    height: 2px;
    background-color: var(--color);
  }

  /** Firefox (idk why we can't just use , to join selectors but it no work)*/
  .s-slider input::-moz-range-thumb {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: var(--color);
    border: none;
  }

  .s-slider input::-moz-range-track {
    height: 2px;
    border: none;
    background-color: var(--color);
  }
</style>
