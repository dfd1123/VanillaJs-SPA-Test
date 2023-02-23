import Component from "@/newCore/Component";
import Title from "@components/Title";
import SearchListWrap from '@components/SearchListWrap'

export default class Home extends Component {
    data(){
        return {
            title: 'Practice',
        }
    }

    template(){
        return `
                <div data-component="Title"></div>
                <div data-component="SearchListWrap"></div>
        `
    }

    generateChildComponent(target: HTMLElement, name: string) {
        const {title} = this.state;

        if(name === 'Title'){
            return new Title(target, {
                text: title,
            })
        }

        if(name === 'SearchListWrap'){
            return new SearchListWrap(target);
        }
    }
}