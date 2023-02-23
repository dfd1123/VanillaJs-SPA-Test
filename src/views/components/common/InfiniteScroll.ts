import Component from "@/newCore/Component";

export default class InfiniteScroll extends Component {
    data(){
        return {
            firstLoaded: false
        }
    }

    mounted(){
        this.initIo();
        window.infiniteScrollIo.observe(this.target);   
    }

    beforeDestroy() {
        window.infiniteScrollIo.unobserve(this.target);
    }

    template(){
        return `
            <div></div>
        `
    }

    initIo(){
        this.target.setAttribute('style', 'width: 100%; min-height: 2px;');

        if(!window.infiniteScrollIo){
            window.infiniteScrollIo = new IntersectionObserver(
                (entries) => {

                  if (entries[0].isIntersecting) {
                    this.state.firstLoaded = true;
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
        if(this.state.firstLoaded) this.props.moreLoad();
    }
}