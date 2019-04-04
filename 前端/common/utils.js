/**
 *节流
 * 触发后，一段时间内无法再触发
 *
 * @param {function} fn - 回调函数
 * @param {number} interval - 时间间隔，默认1s
 */
export function throttle(fn, interval = 1000) {
  // 上一次执行该函数的时间
  let lastTime = 0;
  return function(...args) {
    let now = +new Date();
    // 将当前时间和上一次执行函数时间对比
    // 如果差值大于设置的等待时间就执行函数
    if (now - lastTime > interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

/**
 * 防抖
 * 每次触发后，重新计时；直到没有触发，一段时间后执行回调函数
 *
 * @param {function} fn - 回调函数
 * @param {number} interval - 时间间隔，默认1s
 */
export function debounce(fn, interval = 1000) {
  // 上一次执行该函数的时间
  let timer = 0;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, interval);
  };
}

/**
 * 节流加强版
 * 用 Throttle 来优化 Debounce
 *
 * @param {function} fn - 回调函数
 * @param {number} interval - 时间间隔，默认1s
 */
export function td(fn, interval = 1000) {
  let lastTime = 0,
    timer = null;
  return function(...args) {
    let now = +new Date();
    if (now - lastTime > interval) {
      lastTime = now;
      fn.apply(this, args);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastTime = now;
        fn.apply(this, args);
      }, interval);
    }
  };
}
