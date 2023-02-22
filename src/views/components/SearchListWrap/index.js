import './style.scss';
import Component from "@/core/Component"
import ListItem from "@components/ListItem";
import SearchFilter from "@components/SearchFilter";
import InfiniteScroll from "@components/common/InfiniteScroll";
import services from '@/services';

export default class SearchListWrap extends Component{
    setup(){
        this.$state = {
            list: [],
            showList: [],
            hasNext: true,
            searchParams: {
                name: undefined, 
                isAlive: false,
                noTvSeries: false,
                page: 1,
            }
        };

        this.getList(this.$state.searchParams, false);
    }

    templete(){
        return `
            <div SearchFilter></div>
            <ul class="list-cont">
                ${this.$state.showList.map(item => `<li ListItem key="${item.url}"></li>`).join('')}
            </ul>\
            <div InfiniteScroll></div>
        ` 
    }

    componentDidMount(){
        this.addComponent(SearchFilter, {
            searchParams: this.$state.searchParams,
            handleSearchParamsChange: (params) => this.handleSearchParamsChange(params),
            resetList: () => this.resetList(),
        });

        this.$state.showList.forEach((item) => {
            this.addComponent(ListItem, {
                item,
                deleteItem: () => this.hideItem(item)
            }, item.url);
        });

        this.addComponent(InfiniteScroll, {
            stop: this.$state.hasNext,
            moreLoad: () => this.getList({...this.$state.searchParams, page: this.$state.searchParams.page + 1}, true),
        })

    }

    async getList(params, more = false){
        const {character} = services;

        const searchParams = more ? params : {...params, page: 1}

        const list =( await character.getCharacter(searchParams)).map(item => ({...item, tvSeries: item.tvSeries.filter(tvs => !!tvs)}));
        let newList = more ? [...this.$state.showList, ...list] : list;
        newList = newList.filter(item => searchParams.noTvSeries ? item.tvSeries.length === 0 : true);


        this.setState({
            ...this.$state,
            hasNext: more && this.$state.showList === newList,
            list: newList,
            showList: newList,
            searchParams,
        });
    }

    resetList(){
        this.setState({
            ...this.$state,
            searchParams: {
                name: undefined, 
                isAlive: false,
                noTvSeries: false,
            },
            showList: this.$state.list,
        });
    }

    hideItem(item) {
        this.setState({
            ...this.$state,
            showList: this.$state.showList.filter((info) => item.url !== info.url)
        })
    }

    handleSearchParamsChange(searchParams){
        this.getList(searchParams, false);
    }
}