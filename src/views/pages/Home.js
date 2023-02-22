import Component from "@/core/Component";
import Title from "@components/Title/index.js";
import SearchListWrap from "@components/SearchListWrap";

export default class Home extends Component {
    setup(){
        this.$state = {
            title: 'Tl;qkf',
            list: [1,2,3,4,5,6,7,8,9]
        }
    }

    templete(){
        return `
            <div>
                <div Title></div>
                <div SearchListWrap></div>
            </div>
        `
    }

    componentDidMount(){
        const {title, list} = this.$state;

        this.addComponent(Title, {
            text: title,
        });

        this.addComponent(SearchListWrap, {
            list,
        });
    }
    
}