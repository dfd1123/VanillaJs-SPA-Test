import '@/style/pages/Home.scss';
import Component from "@/core/Component";
import Title from "@components/Title/index.js";
import SearchListWrap from "@components/SearchListWrap";

export default class Home extends Component {
    data(){
        return {
            title: 'Practice',
        };
    }

    template(){
        return `
            <div Home>
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