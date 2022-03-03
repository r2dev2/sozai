<script>
  export let indeterminate = false;
  export let radius = 20;
  export let thicc = 5.7;

  $: width = (radius + thicc) * 2 + 2;
  $: center = radius + thicc + 1;
  $: style = `--circumference: ${2 * Math.PI * radius}px;`;
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
        stroke="red"
        stroke-width={thicc}
      />
    </svg>
  </div>
{/if}

<style>
  svg {
    animation: progress-circular-rotate 1.4s linear infinite;
  }

  circle {
    stroke-linecap: round;
    animation: progress-circular-dash 1.4s ease-in-out infinite;
  }

  @keyframes progress-circular-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0px;
    }
    50% {
      stroke-dasharray: 100, 200;
      stroke-dashoffset: calc(0px - 0.12 * var(--circumference));
    }
    100% {
      stroke-dasharray: 100, 200;
      stroke-dashoffset: calc(0px - var(--circumference));
    }
  }

  @keyframes progress-circular-rotate {
    to {
      transform: rotate(1turn);
    }
  }
</style>
