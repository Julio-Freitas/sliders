export default function debounce(calback, delay) {
  let timer;

  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      calback(args);
    }, delay);
  };
}
