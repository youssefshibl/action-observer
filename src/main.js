/**
 * Observes an element and executes a callback when the element intersects with the viewport.
 *
 * @param {Element|string} target - The DOM element or selector string of the element to observe.
 * @param {Function} callbackmethod - The callback function to execute when the target intersects.
 * @param {Object} options - Configuration options for the observer.
 * @param {boolean} options.once - If true, unobserve the element after the first intersection.
 * @param {number} options.timeout - Delay in milliseconds before the callback is invoked.
 * @param {number} options.threshold - A single number or an array of numbers indicating at what percentage of the target's visibility the observer's callback should be executed.
 * @param {Element} options.root - The element that is used as the viewport for checking visibility of the target.
 * @param {string} options.rootMargin - Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left).
 * @param {any} data - Additional data that will be passed to the callback method.
 *
 * @returns {void}
 */
export function IntersectionObserverFun(
    target,
    callbackmethod,
    {
      once = true,
      timeout = 0,
      threshold = 0,
      root = null,
      rootMargin = "100px",
    } = {},
    data
  ) {
    // Check for IntersectionObserver support in the browser.
    if (!window.IntersectionObserver) {
      console.error("IntersectionObserver is not supported");
      return;
    }

    // Validate that the callback is a function.
    if (typeof callbackmethod !== 'function') {
      console.error("callbackmethod must be a function");
      return;
    }

    // Convert target from string selector to DOM element if necessary.
    if (typeof target === "string") {
      target = document.querySelector(target);
      if (!target) {
        console.error("No element matches the target selector.");
        return;
      }
    } else if (!target) {
      console.error("target is not defined");
      return;
    }

    // Create an instance of IntersectionObserver.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Execute the callback after a specified timeout if it is greater than 0.
            if (timeout === 0) {
              callbackmethod(entry, data);
            } else {
              setTimeout(() => {
                callbackmethod(entry, data);
              }, timeout);
            }

            // Unobserve the element after the first intersection if `once` is true.
            if (once) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: rootMargin,
        root: root,
      }
    );

    // Start observing the target element.
    observer.observe(target);
}
