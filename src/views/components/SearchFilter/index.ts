import './style.scss';
import Component from '@/core/Component';
import ToggleButton from '@components/common/ToggleButton';
import Button from '@components/common/Button/index';

export default class SearchFilter extends Component {
  template() {
    return `
            <div class="filter-area">
                <div class="toggle-switch-cont">
                    <div key="isAlive" data-component="ToggleButton"></div>
                    <div key="gender" data-component="ToggleButton"></div>
                    <div key="noTvSeries" data-component="ToggleButton"></div>
                </div>
                <div data-component="Button" class="btn-reset"></div>
            </div>
        `;
  }

  componentDidMount() {
    const { searchParams } = this.$props;

    this.addComponent(
      ToggleButton,
      {
        value: !!searchParams.isAlive,
        label: '생존 인물만',
        onChange: (e: Event) => {
          const target = e.target as HTMLInputElement;
          this.$props.handleSearchParamsChange({
            ...searchParams,
            isAlive: target.checked,
          });
        },
      },
      'isAlive'
    );

    this.addComponent(
      ToggleButton,
      {
        value: searchParams.gender === 'Female',
        label: '여자',
        onChange: (e: Event) => {
          const target = e.target as HTMLInputElement;
          this.$props.handleSearchParamsChange({
            ...searchParams,
            gender: target.checked ? 'Female' : undefined,
          });
        },
      },
      'gender'
    );

    this.addComponent(
      ToggleButton,
      {
        value: !!searchParams.noTvSeries,
        label: 'tvSeries 없음',
        onChange: (e: Event) => {
          const target = e.target as HTMLInputElement;
          this.$props.handleSearchParamsChange({
            ...searchParams,
            noTvSeries: target.checked,
          });
        },
      },
      'noTvSeries'
    );

    this.addComponent(Button, {
      text: '초기화',
      onClick: () => {
        this.$props.resetList();
      },
    });
  }
}
