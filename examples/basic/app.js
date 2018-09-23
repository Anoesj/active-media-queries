const activeMediaQueriesDiv = document.getElementById('active-media-queries'),
      inactiveMediaQueriesDiv = document.getElementById('inactive-media-queries');

window.addEventListener('mq-change', e => {
  activeMediaQueriesDiv.innerHTML = Array.from(e.detail.currentlyActiveMediaQueries.keys()).toString();
  inactiveMediaQueriesDiv.innerHTML = Array.from(e.detail.currentlyInactiveMediaQueries.keys()).toString();
});

window.addEventListener('mq-inactive', e => {
  console.log('Media query just turned inactive:', e.detail.changedMediaQueries);
});

window.addEventListener('mq-active', e => {
  console.log('Media query just turned active:', e.detail.changedMediaQueries);
});