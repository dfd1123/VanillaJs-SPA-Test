import Component from './Component';

let currentObserver: Component | null = null;
export const setCurrentObserver = (observer: Component) => {
  currentObserver = observer;
};

export const observable = <T extends object>(target: T, isStore = false): T => {
  Object.keys(target).forEach((key) => {
    let cache: any = target[key as keyof typeof target];

    const observers: Record<string, Component> = {};

    Object.defineProperty(target, key, {
      get() {
        if (currentObserver) {
          observers[currentObserver.constructor.name] = currentObserver;
        }

        return cache;
      },
      set(value) {
        cache = value;
        Object.keys(observers).map((obKey) =>
          observers[obKey].observeFunc(isStore ? key : '')
        );
      },
    });
  });

  return target;
};
