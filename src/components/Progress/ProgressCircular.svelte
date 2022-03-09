<script>
  import { getColor } from '../../js/utils.js';

  export let indeterminate = false;
  export let radius = 20;
  export let thickness = 5.7;
  export let color = 'var(--primary-color)';

  $: width = (radius + thickness) * 2 + 2;
  $: center = radius + thickness + 1;
  $: style = `--color: ${getColor(color)}; --circumference: ${
    2 * Math.PI * radius
  }px;`;
</script>

<!-- credit to vuetify for this approach -->
{#if indeterminate}
  <div class="s-progressloader-circular" {style}>
    <svg xmlns="http://www.w3.org/2000/svg" {width} height={width}>
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="transparent"
        stroke-width={thickness}
      />
    </svg>
  </div>
{/if}

<style>
  .s-progressloader-circular {
    --initial-stroke-dasharray: calc(1.6 * var(--circumference));
    --stroke-dasharray-1: calc(0.8 * var(--circumference));
    --stroke-dasharray-2: calc(1.6 * var(--circumference));
    --halfway-dashoffset: calc(0px - 0.12 - var(--circumference));
    --full-dashoffset: calc(0px - var(--circumference));
  }

  svg {
    animation: progress-circular-rotate 1.4s linear infinite;
  }

  circle {
    stroke: var(--color);
    stroke-linecap: round;
    animation: progress-circular-dash 1.4s ease-in-out infinite;
  }

  @keyframes progress-circular-dash {
    0% {
      stroke-dasharray: 1, var(--initial-stroke-dasharray);
      stroke-dashoffset: 0px;
    }
    50% {
      stroke-dasharray: var(--stroke-dasharray-1), var(--stroke-dasharray-2);
      stroke-dashoffset: var(--halfway-dashoffset);
    }
    100% {
      stroke-dasharray: var(--stroke-dasharray-1), var(--stroke-dasharray-2);
      stroke-dashoffset: var(--full-dashoffset);
    }
  }

  @keyframes progress-circular-rotate {
    to {
      transform: rotate(1turn);
    }
  }
</style>
