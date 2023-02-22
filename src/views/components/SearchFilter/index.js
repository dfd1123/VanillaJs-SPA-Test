import './style.scss';
import Component from "@/core/Component"
import ToggleButton from "@components/common/ToggleButton";
import Button from '@components/common/Button/index';


export default class SearchFilter extends Component{
    templete(){
        return `
            <div class="filter-area">
                <div class="toggle-switch-cont">
                    <div key="생존 인물만" ToggleButton></div>
                    <div key="성별" ToggleButton></div>
                    <div key="tvSeries 없음" ToggleButton></div>
                </div>
                <div Button class="btn-reset"></div>
            </div>
        `;
    }

    componentDidMount(){
        const {searchParams} = this.$props;
        // this.addComponent(TextInput, {
        //     value: '',
        //     placeholder: '타이틀을 입력해주세요.'
        // });

        this.addComponent(ToggleButton, {
            value: !!searchParams.isAlive,
            label: '생존 인물만',
            onChange: (e) => {
                this.$props.handleSearchParamsChange({...searchParams, isAlive: e.target.checked});
            }
        }, '생존 인물만');

        this.addComponent(ToggleButton, {
            value: searchParams.gender === 'Female',
            label: '여자',
            onChange: (e) => {
                this.$props.handleSearchParamsChange({...searchParams, gender: e.target.checked ? 'Female' : undefined});
            }
        }, '성별');

        this.addComponent(ToggleButton, {
            value: !!searchParams.noTvSeries,
            label: 'tvSeries 없음',
            onChange: (e) => {
                this.$props.handleSearchParamsChange({...searchParams, noTvSeries: e.target.checked});
            }
        }, 'tvSeries 없음');

        this.addComponent(Button, {
            text: '초기화',
            onClick: () => {
                this.$props.resetList();
            }
        });

    }
}