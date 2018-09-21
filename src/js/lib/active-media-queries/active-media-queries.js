window.mediaQueries = {
  allMediaQueries: JSON.parse(JSON.parse(getComputedStyle(document.body).getPropertyValue('--media-queries'))),
  activeMediaQueries: new Set(),
  declareMediaQueryIsActive: function (mediaQueryName) {
    if (this.activeMediaQueries.has(mediaQueryName) === false) {
      this.activeMediaQueries.add(mediaQueryName);
      this.dispatchCustomEvent('mq-active', mediaQueryName);
    }
  },
  declareMediaQueryIsInactive: function (mediaQueryName) {
    if (this.activeMediaQueries.has(mediaQueryName) === true) {
      this.activeMediaQueries.delete(mediaQueryName);
      this.dispatchCustomEvent('mq-inactive', mediaQueryName);
    }
  },
  dispatchCustomEvent: function (eventName, mediaQueryName) {
    // Create and dispatch custom event
    window.dispatchEvent(new CustomEvent(eventName, {
      detail: {
        name: mediaQueryName
      }
    }));
  }
}

const updateActiveMediaQueries = () => {
  for (const [mediaQueryName, mediaQuery] of Object.entries(window.mediaQueries.allMediaQueries)) {
    if (window.matchMedia(mediaQuery).matches) {
      window.mediaQueries.declareMediaQueryIsActive(mediaQueryName);
    }

    else {
      window.mediaQueries.declareMediaQueryIsInactive(mediaQueryName);
    }
  }
}

window.addEventListener('resize', updateActiveMediaQueries);
updateActiveMediaQueries();