let currentObserver = null;
// 바뀐 부분
export const setCurrentObserver = observer => {
  currentObserver = observer;
};

export const observable = target => {
  Object.keys(target).forEach(key => {
    let cache = target[key];

    const observers = {};

    Object.defineProperty(target, key, {
      get() {
        // 바뀐 부분
        if (currentObserver) {
          observers[currentObserver.constructor.name] = currentObserver;
        }

        return cache;
      },
      set(value) {
        cache = value;
        Object.keys(observers).map(key => observers[key].render());
      },
    });
  });

  return target;
};