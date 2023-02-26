import Component from '@/core/Component';

export default class InfiniteScroll extends Component {
  private firstLoaded = false;

  create() {
    this.initIo();
  }

  componentDidMount() {
    if (!this.$props.stop) {
      window.infiniteScrollIo.observe(this.$target);
    } else {
      window.infiniteScrollIo.unobserve(this.$target);
    }
  }

  template() {
    return `
            <div></div>
        `;
  }

  initIo() {
    this.$target.setAttribute('style', 'width: 100%; min-height: 2px;');

    if (!window.infiniteScrollIo) {
      window.infiniteScrollIo = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            this.firstLoaded = true;
            this.moreLoad();
          }
        },
        {
          root: null,
          rootMargin: '100px 0px',
          threshold: [1.0],
        }
      );
    }
  }

  moreLoad() {
    if (this.firstLoaded) this.$props.moreLoad();
  }
}
