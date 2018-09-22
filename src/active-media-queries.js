const throttle = (func, limit) => {
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

window.mediaQueries = {
  mediaQueries: new Map(),

  init: function () {
    const mediaQueries = JSON.parse(JSON.parse(getComputedStyle(document.body).getPropertyValue('--media-queries')));
    
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
        currentlyActiveMediaQueries: this.activeMediaQueries
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

window.mediaQueries.init();










































// window.mediaQueries = {
//   allMediaQueries: JSON.parse(JSON.parse(getComputedStyle(document.body).getPropertyValue('--media-queries'))),
//   activeMediaQueries: new Set(),
//   declareMediaQueriesAreActive: function (mediaQueries) {
//     const newActiveMediaQueries = new Set();
//     for (const mediaQueryName of mediaQueries) {
//       if (this.activeMediaQueries.has(mediaQueryName) === false) {
//         newActiveMediaQueries.add(mediaQueryName);
//         this.activeMediaQueries.add(mediaQueryName);
//       }
//     }

//     this.dispatchCustomEvent('mq-active', newActiveMediaQueries);
//   },
//   declareMediaQueriesAreInactive: function (mediaQueries) {
//     const newInactiveMediaQueries = new Set();
//     for (const mediaQueryName of mediaQueries) {
//       if (this.activeMediaQueries.has(mediaQueryName) === true) {
//         newInactiveMediaQueries.add(mediaQueryName)
//         this.activeMediaQueries.delete(mediaQueryName);
//       }
//     }

//     this.dispatchCustomEvent('mq-inactive', newInactiveMediaQueries);
//   },
//   dispatchCustomEvent: function (eventName, mediaQueries) {
//     // Create and dispatch custom event
//     window.dispatchEvent(new CustomEvent(eventName, {
//       detail: {
//         changedMediaQueries: mediaQueries,
//         currentlyActiveMediaQueries: this.activeMediaQueries
//       }
//     }));
//   }
// }

// const updateActiveMediaQueries = () => {
//   // Buffer objects
//   const activeMediaQueries = new Set(),
//         inactiveMediaQueries = new Set();

//   // Check for (in)active media queries
//   for (const [mediaQueryName, mediaQuery] of Object.entries(window.mediaQueries.allMediaQueries)) {
//     if (window.matchMedia(mediaQuery).matches) {
//       activeMediaQueries.add(mediaQueryName);
//       // window.mediaQueries.declareMediaQueryIsActive(mediaQueryName);
//     }

//     else {
//       inactiveMediaQueries.add(mediaQueryName);
//       // window.mediaQueries.declareMediaQueryIsInactive(mediaQueryName);
//     }
//   }

//   window.mediaQueries.declareMediaQueriesAreActive(activeMediaQueries);
// }

// window.addEventListener('resize', throttle(updateActiveMediaQueries, 50));
// updateActiveMediaQueries();