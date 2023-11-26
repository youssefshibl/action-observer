![Untitled(3)](https://github.com/youssefshibl/action-observer/assets/63800183/7776a777-a103-4d6e-921b-d0b8a3ddbe3a)

# 👀 Acion Observer

Action observer is a simple package that allows you to observe your element and when it visible in the borwser it will trigger a action this action may be fetch data from api or anything you want , the main idea of it depend on `the Intersection Observer API`.

## 🕸️ Installation

```bash
npm install action-observer-js
```

## 🕸️ usage

```js
import observe from "action-observer";
observe(element, callbackfunction, options, data);
```
+ 🚧 element: the element you want to observe.
  - type: string (selectro of element) / HTMLElement
+ 🚧 callbackfunction: the function that will be called when the element is visible.
+ 🚧 options: the options of the observer.
  - type: object
  - default: { root: null, rootMargin: "0px", threshold: 0 , timeout: 0 , once: true }
   - 🚀 root: the element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.
    - 🚀 rootMargin: margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros.
    - 🚀 threshold: either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.
    - 🚀 timeout: the time in milliseconds that the observer waits before calling the callback function.
    - 🚀 once: if true the observer will be disconnected after the first time the element is visible.
+ 🚧 data: the data that will be passed to the callback function.

## 🤿 Example Vue

```vue
<template>
  <div>
    <div v-for="number in 20" :key="number">
      <div class="section">{{ number }}</div>
    </div>
    <div id="observableelement" class="section">{{ msg1 }}</div>
    <div v-for="number in 20" :key="number">
      <div class="section">{{ number }}</div>
    </div>
  </div>
</template>

<script>
import master from "action-observer";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg1: "Welcome to Your Vue.js App",
      data: null,
    };
  },
  mounted() {
    master(
      "#observableelement",
      async () => {
        console.log("i am here");
        this.msg1 = "changed successfully";
        let data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        data = await data.json();
        this.data = data;
      },
      {
        timeout: 4000,
        once: true,
      }
    );
  },
};
</script>

<style scoped lang="scss">
.section {
  background-color: #0d6efd;
  width: 400px;
  margin: 10px auto 10px auto;
  color: white;
  display: flex;
  text-align: center;
  justify-content: center;
  padding: 20px;
}
</style>
```