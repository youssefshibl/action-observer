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
    if (!window.IntersectionObserver) {
      console.error("IntersectionObserver is not supported");
      return
    }
    if (typeof target === "string") {
      target = document.querySelector(target);
    }
    if(!target){
      console.error("target is not defined");
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // check if the element is in viewport
          if (entry.isIntersecting) {
            // check if time out
            if (timeout == 0) {
              callbackmethod(entry, data);
            } else {
              setTimeout(() => {
                callbackmethod(data);
              }, timeout);
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
  
