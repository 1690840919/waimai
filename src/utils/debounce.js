export default function debounce(fn, time = 500) {
  let timer
  return function () {
    if (timer) {
      clearInterval(timer)
    }
    console.log('防抖中');
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, time);
  }
}
