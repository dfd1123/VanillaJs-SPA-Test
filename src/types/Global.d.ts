export {};

declare global {
  interface Window {
    infiniteScrollIo?: IntersectionObserver;
  }
}
