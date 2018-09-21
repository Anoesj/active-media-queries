window.addEventListener('mq-active', e => {
  console.log('Active media query:', e.detail.name);
});

window.addEventListener('mq-inactive', e => {
  console.log('Inactive media query:', e.detail.name);
});