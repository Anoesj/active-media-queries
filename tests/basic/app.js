const test = document.getElementById('active-media-queries'),
      writeActiveMediaQueriesToHTML = mqs => {
        test.innerHTML = Array.from(mqs.keys()).toString();
      };

window.addEventListener('mq-change', e => {
  writeActiveMediaQueriesToHTML(e.detail.currentlyActiveMediaQueries);
});

window.addEventListener('mq-inactive', e => {
  console.log('Media query just turned inactive:', e.detail.changedMediaQueries);
});

window.addEventListener('mq-active', e => {
  console.log('Media query just turned active:', e.detail.changedMediaQueries);
});