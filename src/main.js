export function IntersectionObserverFun(
    target,
    callbackmethod,
     {
      once = true,
      time = 0,
      threshold = 0,
      root = null,
      rootMargin = "100px",
    } = {},
    data
  ) {
    if (!window.IntersectionObserver) {
      console.error("IntersectionObserver is not supported");
    }
    if (typeof target === "string") {
      target = document.querySelector(target);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // check if the element is in viewport
          if (entry.isIntersecting) {
            // check if time out
            if (time == 0) {
              callbackmethod(entry, data);
            } else {
              setTimeout(() => {
                callbackmethod(data);
              }, time);
            }
            // unobserve the element
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
    observer.observe(target);
  }
  
