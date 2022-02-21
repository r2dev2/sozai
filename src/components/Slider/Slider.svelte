<script context="module">
  console.warn('Slider is not finished yet');
</script>

<script>
  export let min = 0;
  export let max = 100;
</script>

<div class="s-component s-slider">
  <input type="range" {min} {max} tabindex="0" />
</div>

<style>
  .s-slider {
    --color: var(--primary-color);
    padding: 2rem;
  }

  .s-slider input {
    width: 100%;
  }

  .s-slider input::-moz-range-thumb {
    --opacity: 0.2;
    position: relative;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: var(--color);
    border: 0.75rem solid red;
    transition: border 200ms ease-in-out;
    animation: add-opacity 1s calc((1 - var(--opacity)) * -1s) linear paused
      forwards;
  }

  .s-slider input:hover::-moz-range-thumb {
    border: 0.75rem solid red;
  }

  .s-slider input::-moz-range-track {
    height: 2px;
    border: none;
    background-color: var(--color);
  }

  @keyframes add-opacity {
    to {
      border: 0.75rem solid transparent;
    }
  }
</style>
