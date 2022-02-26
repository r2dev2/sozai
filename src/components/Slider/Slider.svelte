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

  /** @type {(e: MouseEvent) => void}*/
  const handleMouseMove = (e) => {
    if (!thumbShadowEl || mouseIsDown) return;
    const boundingRect = thumbShadowEl.getBoundingClientRect();
    thumbHovered =
      e.clientX >= boundingRect.left &&
      e.clientX <= boundingRect.right &&
      e.clientY >= boundingRect.top &&
      e.clientY <= boundingRect.bottom;
  };

  $: filledPercent = (value - min) / (max - min);
  $: style = `--movable-dist: calc(100% - 0.75rem); --thumb-dist: calc(0.75rem + ${filledPercent} * var(--movable-dist));`;
</script>

<svelte:window
  on:mousemove={handleMouseMove}
  on:mousedown={() => (mouseIsDown = true)}
  on:mouseup={() => (mouseIsDown = false)}
/>

<div class="s-component s-slider" {style}>
  <div class="slider-container">
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <div
      bind:this={thumbShadowEl}
      class="thumb-shadow"
      class:hover={thumbHovered}
      on:mouseover={() => console.log('mouseover')}
      on:mouseenter={() => (thumbHovered = true)}
      on:mouseleave={() => (thumbHovered = false)}
    />
    <input type="range" {min} {max} {step} bind:value tabindex="0" />
  </div>
</div>

<style>
  .s-slider {
    --color: var(--primary-color);
    --thumb-size: 0.75rem;
    --thumb-hover-size: 2.625rem;
    padding: 2rem;
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
    transform: translate(
      calc(-50% - var(--thumb-size) / 2 + 1.5px),
      calc(-50% - 1.5px)
    );
    border-radius: 50%;
    opacity: 0.2;
    background: var(--color);
    pointer-events: none;
    transition: width var(--slider-transition-duration) ease-out,
      height var(--slider-transition-duration) ease-out;
  }

  .thumb-shadow.hover {
    width: var(--thumb-hover-size);
    height: var(--thumb-hover-size);
  }

  .s-slider input {
    width: 100%;
    background-color: transparent;
  }

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
