import './style.scss';
import { store } from '@/store';
import Component from '@/core/Component';
import ListItem from '@components/ListItem';
import SearchFilter from '@components/SearchFilter';
import InfiniteScroll from '@components/common/InfiniteScroll';
import Loading from '@components/common/Loading';
import services from '@/services';
import { getQuerys } from '@/core/Router';
import {
  GetCharacterListParams,
  CharacterItem,
} from '@/services/CharacterService';
import NoData from '../common/NoData';

type SearchParamsType = GetCharacterListParams & { noTvSeries: boolean };

type StateType = {
  initPage: number;
  list: CharacterItem[] | null;
  showList: CharacterItem[];
  hasNext: boolean;
  searchParams: SearchParamsType;
};

export default class SearchListWrap extends Component {
  data(): StateType {
    const { page = 1 } = getQuerys();

    return {
      initPage: Number(page),
      list: null,
      showList: [],
      hasNext: true,
      searchParams: {
        name: undefined,
        isAlive: false,
        noTvSeries: false,
        page: Number(page),
      },
    };
  }

  create() {
    this.useStore(store, 'loading');
    this.getList(this.$state.searchParams, true);
  }

  template() {
    return `
            <div SearchFilter></div>
            ${
              this.$state.list
                ? this.$state.list.length > 0
                  ? `
                <ul class="list-cont">
                    ${this.$state.showList
                      .map((item) => `<li ListItem key="${item.url}"></li>`)
                      .join('')}
                </ul>
            `
                  : `
                <div NoData></div>
            `
                : `<div Loading></div>`
            }
            <div InfiniteScroll></div>
        `;
  }

  componentDidMount() {
    this.addComponent(Loading);

    this.addComponent(NoData, {
      text: '찾으시는 데이터가 없습니다.',
    });

    this.addComponent(SearchFilter, {
      searchParams: this.$state.searchParams,
      handleSearchParamsChange: (params: SearchParamsType) =>
        this.handleSearchParamsChange(params),
      resetList: () => this.resetList(),
    });

    this.$state.showList.forEach((item) => {
      this.addComponent(
        ListItem,
        {
          item,
          deleteItem: () => this.hideItem(item),
        },
        item.url
      );
    });

    this.addComponent(InfiniteScroll, {
      stop: !this.$state.hasNext || !this.$state.list,
      moreLoad: () => {
        this.getList(
          {
            ...this.$state.searchParams,
            page: this.$state.searchParams.page + 1,
          },
          true
        );
      },
    });
  }

  async getList(params: SearchParamsType, more = false) {
    if (this.$store.state.loading) return;

    // console.log(this.$state.searchParams.page);

    const { character, loadingModal } = services;

    const searchParams = more
      ? params
      : { ...params, page: this.$state.initPage };

    if (this.$state.list) loadingModal.open();

    const list = (await character.getCharacter(searchParams)).map((item) => ({
      ...item,
      tvSeries: item.tvSeries.filter((tvs) => !!tvs),
    }));

    let newList = more ? [...this.$state.showList, ...list] : list;
    newList = newList.filter((item) =>
      searchParams.noTvSeries ? item.tvSeries.length === 0 : true
    );

    loadingModal.close();

    this.setState({
      ...this.$state,
      hasNext: newList.length > 0,
      list: newList,
      showList: newList,
      searchParams,
    });
  }

  resetList() {
    this.getList({ name: undefined, isAlive: false, noTvSeries: false }, false);
  }

  hideItem(item: CharacterItem) {
    this.setState({
      ...this.$state,
      showList: this.$state.showList.filter((info) => item.url !== info.url),
    });
  }

  handleSearchParamsChange(searchParams: SearchParamsType) {
    this.getList(searchParams, false);
  }
}
