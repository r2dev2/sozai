/**
 * From smelte
 */

// Thanks Lagden! https://svelte.dev/repl/61d9178d2b9944f2aa2bfe31612ab09f?version=3.6.7
// smelte: modified to use css color instead of tailwind class color
// sozai: modified to use js styles instead of tailwind classes
function ripple(color, centered) {
  return function(event) {
    const target = event.currentTarget;
    const circle = document.createElement("span");
    const d = Math.max(target.clientWidth, target.clientHeight);

    const removeCircle = () => {
      circle.remove();
      circle.removeEventListener("animationend", removeCircle);
    };

    circle.addEventListener("animationend", removeCircle);
    circle.style.width = circle.style.height = `${d}px`;
    const rect = target.getBoundingClientRect();

    if (centered) {
      circle.classList.add(
        "ripple-centered",
        // `bg-${color}-transDark` TODO do this when you figure out what transDark is
      );
      circle.style.position = 'absolute';
      circle.style.top = '0px';
      circle.style.left = '0px';
    } else {
      circle.style.left = `${event.clientX - rect.left - d / 2}px`;
      circle.style.top = `${event.clientY - rect.top - d / 2}px`;
      circle.style.backgroundColor = color;
      circle.style.opacity = '0.2';

      circle.classList.add("ripple-normal");
    }

    circle.classList.add("ripple");

    target.appendChild(circle);
  };
}

export default function r(color = "primary", centered = false) {
  return function(node) {
    const onMouseDown = ripple(color, centered);
    node.addEventListener("mousedown", onMouseDown);

    return {
      onDestroy: () => node.removeEventListener("mousedown", onMouseDown),
    };
  };
}
