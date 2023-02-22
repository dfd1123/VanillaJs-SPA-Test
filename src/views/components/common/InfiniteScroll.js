import Component from "@/core/Component";

export default class InfiniteScroll extends Component {
    #firstLoaded = false;

    setup(){
        this.initIo();
    }

    componentDidMount() {
        if(!this.$props.stop){
            window.infiniteScrollIo.observe(this.$target);   
        }else{
            window.infiniteScrollIo.unobserve(this.$target);
        }
    }

    templete(){
        return `
            <div></div>
        `
    }

    initIo(){
        this.$target.setAttribute('style', 'width: 100%; min-height: 2px;');

        if(!window.infiniteScrollIo){
            window.infiniteScrollIo = new IntersectionObserver(
                (entries, observer) => {

                  if (entries[0].isIntersecting) {
                    this.#firstLoaded = true;
                    this.moreLoad();
                  }
                },
                {
                  root: null,
                  rootMargin: '100px 0px',
                  threshold: [0.1, 0.2, 0.5, 0.8, 0.9, 1.0],
                },
             );
        }
    }

    moreLoad(){
        if(this.#firstLoaded) this.$props.moreLoad();
    }
}