(() => {
  // TODO: Offer programmer option to choose between throttle/debounce and give the programmer control over throttle/debounce times
  window.mediaQueries = {
    mediaQueries: new Map(),

    init: function () {
      // NOTE: Tested only in Chrome 69 and Firefox 62 on Ubuntu 18.04.01LTS for now
      const mediaQueriesCSSVariable = getComputedStyle(document.body).getPropertyValue('--media-queries');
      const mediaQueriesString = mediaQueriesCSSVariable.substring(2).slice(0, -1).replace(/'/g, '"');
      const mediaQueries = JSON.parse(mediaQueriesString);
      
      for (const [name, mediaQuery] of Object.entries(mediaQueries)) {
        this.mediaQueries.set(name, {
          name: name,
          mediaQuery: mediaQuery,
          active: this.testActive(mediaQuery)
        });
      }

      this.dispatchCustomEvent('mq-change');
      window.addEventListener('resize', throttle(this.update.bind(this, null), 100));
    },

    testActive: mediaQuery => {
      return window.matchMedia(mediaQuery).matches;
    },

    update: function () {
      const changedMediaQueries = new Map();
      let changes = false;

      for (const [name, mediaQueryObj] of this.mediaQueries) {
        const currentState = mediaQueryObj.active,
              newState = this.testActive(mediaQueryObj.mediaQuery);

        if (currentState !== newState) {
          changes = true;
          changedMediaQueries.set(name, mediaQueryObj);
        }

        mediaQueryObj.active = newState;
      }

      if (changes) this.dispatchCustomEvent('mq-change', changedMediaQueries);
    },

    dispatchCustomEvent: function (eventName, changedMediaQueries) {
      // changedMediaQueries is null on init, so we state that
      // all mediaQueries changed to provide useful data.
      if (!changedMediaQueries) changedMediaQueries = this.mediaQueries;

      // Create and dispatch custom event
      window.dispatchEvent(new CustomEvent(eventName, {
        detail: {
          changedMediaQueries: changedMediaQueries,
          currentlyActiveMediaQueries: this.activeMediaQueries,
          currentlyInactiveMediaQueries: this.inactiveMediaQueries
        }
      }));

      if (eventName === 'mq-change') {
        const newlyActiveMediaQueries = new Map(),
              newlyInactiveMediaQueries = new Map();
        
        for (const [name, mediaQueryObj] of changedMediaQueries) {
          if (mediaQueryObj.active === true) {
            newlyActiveMediaQueries.set(name, mediaQueryObj);
          }
          else {
            newlyInactiveMediaQueries.set(name, mediaQueryObj);
          }
        }
        
        if (newlyActiveMediaQueries.size) this.dispatchCustomEvent('mq-active', newlyActiveMediaQueries);
        if (newlyInactiveMediaQueries.size) this.dispatchCustomEvent('mq-inactive', newlyInactiveMediaQueries);
      }
    }
  }

  Object.defineProperty(window.mediaQueries, 'activeMediaQueries', {
    get: function () {
      const activeMediaQueries = new Map();
      for (const [name, mediaQueryObj] of this.mediaQueries) {
        if (mediaQueryObj.active === true) activeMediaQueries.set(name, mediaQueryObj);
      }
      return activeMediaQueries;
    }
  });

  Object.defineProperty(window.mediaQueries, 'inactiveMediaQueries', {
    get: function () {
      const inactiveMediaQueries = new Map();
      for (const [name, mediaQueryObj] of this.mediaQueries) {
        if (mediaQueryObj.active === false) inactiveMediaQueries.set(name, mediaQueryObj);
      }
      return inactiveMediaQueries;
    }
  });

  function throttle (func, limit) {
    let lastFunc, lastRan;

    return function () {
      const context = this,
            args = arguments;
      
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      }

      else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    }
  }

  window.mediaQueries.init();
})();