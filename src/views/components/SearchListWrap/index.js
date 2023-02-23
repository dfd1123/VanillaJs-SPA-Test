import './style.scss';
import Component from "@/core/Component";
import ListItem from "@components/ListItem";
import SearchFilter from "@components/SearchFilter";
import InfiniteScroll from "@components/common/InfiniteScroll";
import Loading from '@components/common/Loading';
import services from '@/services';
import route from '@/router';

export default class SearchListWrap extends Component{
    setup(){
        const {page = 1} = route.getQuerys();

        this.$state = {
            initPage: Number(page),
            list: null,
            showList: [],
            hasNext: true,
            searchParams: {
                name: undefined, 
                isAlive: false,
                noTvSeries: false,
                page: Number(page),
            }
        };

        this.getList(this.$state.searchParams, true);
    }

    template(){
        return `
            <div SearchFilter></div>
            ${this.$state.list ? `
                <ul class="list-cont">
                    ${this.$state.showList.map(item => `<li ListItem key="${item.url}"></li>`).join('')}
                </ul>
            ` : `
                <div Loading></div>
            `}
            <div InfiniteScroll></div>
        ` 
    }

    componentDidMount(){
        this.addComponent(Loading);

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

        const searchParams = more ? params : {...params, page: this.$state.initPage}

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
        this.getList({name: undefined, isAlive: false, noTvSeries: false}, false)
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