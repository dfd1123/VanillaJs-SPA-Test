let currentObserver = null;
export const setCurrentObserver = observer => {
  currentObserver = observer;
};

export const observable = (target, isStore) => {
  Object.keys(target).forEach(key => {
    let cache = target[key];

    const observers = {};

    Object.defineProperty(target, key, {
      get() {
        if (currentObserver) {
          observers[currentObserver.constructor.name] = currentObserver;
        }

        return cache;
      },
      set(value) {
        cache = value;
        Object.keys(observers).map(obKey => observers[obKey].observeFunc(isStore ? key : ''));
      },
    });
  });

  return target;
};