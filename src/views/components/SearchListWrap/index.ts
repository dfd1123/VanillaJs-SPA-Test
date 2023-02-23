import './style.scss';
import Component from '@/newCore/Component';
import ListItem from "@components/ListItem";
import SearchFilter from "@components/SearchFilter";
import InfiniteScroll from "@components/common/InfiniteScroll";
import services from '@/services';
import Loading from '@components/common/Loading';
import { CharacterItem, GetCharacterListParams } from '@/services/CharacterService';

type SearchParamsType = GetCharacterListParams & {noTvSeries: boolean};

type StateType = {
    list: CharacterItem[] | null;
    showList: CharacterItem[];
    hasNext: boolean;
    searchParams: SearchParamsType;
}

export default class SearchListWrap extends Component{
    data(): StateType{
        return {
            list: null,
            showList: [],
            hasNext: true,
            searchParams: {
                name: undefined, 
                isAlive: false,
                noTvSeries: false,
                page: 1,
            }
        };
    }

    // mounted(){
    //     this.getList(this.state.searchParams, false);
    // }

    template(){
        return `
            <div data-component="SearchFilter"></div>
            ${this.state.list ? `
                <ul class="list-cont">
                    ${this.state.showList.map((item, index) => `<li data-component="ListItem" key="${index}"></li>`).join('')}
                </ul>
            ` : `
                <div data-component="Loading"></div>
            `}
            <div data-component="InfiniteScroll"></div>
        ` 
    }

    generateChildComponent(target: HTMLElement, name: string, key: string) {
        if(name === 'Loading'){
            return new Loading(target);
        }

        if(name === 'SearchFilter'){
            return new SearchFilter(target, {
                searchParams: this.state.searchParams,
                resetList: () => this.resetList(),
                handleSearchParamsChange: (params: SearchParamsType) => this.handleSearchParamsChange(params),
            })
        }

        if(name === 'ListItem'){
            const item = this.state.list[Number(key)];
            return new ListItem(target, {
                item,
                deleteItem: () => this.hideItem(item)
            })
        }

        if(name === 'InfiniteScroll'){
            return new InfiniteScroll(target, {
                stop: this.state.hasNext,
                moreLoad: () => this.getList({...this.state.searchParams, page: this.state.searchParams.page + 1}, true),
            });
        }
    }

    async getList(params: SearchParamsType, more = false){
        const {character} = services;

        const searchParams = more ? params : {...params, page: 1}

        const list =( await character.getCharacter(searchParams)).map(item => ({...item, tvSeries: item.tvSeries.filter(tvs => !!tvs)}));
        let newList = more ? [...this.state.showList, ...list] : list;
        newList = newList.filter(item => searchParams.noTvSeries ? item.tvSeries.length === 0 : true);


        this.setState({
            ...this.state,
            hasNext: more && this.state.showList === newList,
            list: newList,
            showList: newList,
            searchParams,
        });
    }

    resetList(){
        // this.getList({name: undefined, isAlive: false, noTvSeries: false}, false)
    }

    hideItem(item: CharacterItem) {
        console.log(item);
        this.setState({
            ...this.state,
            showList: this.state.showList.filter((info) => item.url !== info.url)
        })
    }

    handleSearchParamsChange(searchParams: GetCharacterListParams & {noTvSeries: boolean}){
        // this.getList(searchParams, false);
    }
}