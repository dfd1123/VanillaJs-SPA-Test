import './style.scss';
import Component from '@/core/Component';
import LabelItem from '@components/common/LabelItem/index';
import Button from '@components/common/Button';

export default class ListItem extends Component {
  data() {
    const { item = {} } = this.$props;

    return {
      topInfo: [
        { label: 'name', value: item.name || '-' },
        { label: 'aliases', value: (item.aliases || []).join(', ') || '-' },
      ],
      title: { label: 'title', value: (item.titles || []).join(', ') || '-' },
      bottomInfo: [
        { label: 'books', value: (item.books || []).length },
        { label: 'tvSeries', value: (item.tvSeries || []).length },
      ],
    };
  }

  template() {
    return `
            <div class="info-area">
                <div class="top-info">
                    ${this.$state.topInfo
                      .map(
                        (info) =>
                          `<div key="${info.label}" data-component="LabelItem"></div>`
                      )
                      .join('')}
                </div>
                <b key="${
                  this.$state.title.label
                }" data-component="LabelItem" class="title"></b>
                <div class="bottom-info">
                    ${this.$state.bottomInfo
                      .map(
                        (info) =>
                          `<div key="${info.label}" data-component="LabelItem"></div>`
                      )
                      .join('')}
                </div>
            </div>
            <div data-component="Button" class="btn-delete"></div>
        `;
  }

  componentDidMount() {
    const { topInfo, bottomInfo, title } = this.$state;
    const { deleteItem } = this.$props;

    [...topInfo, ...bottomInfo, title].forEach((info) => {
      this.addComponent(LabelItem, info, info.label);
    });

    this.addComponent(Button, {
      text: '삭제',
      onClick: () => {
        deleteItem && deleteItem();
      },
    });
  }
}
