import './style.scss';
import Component from "@/newCore/Component"
import ToggleButton from "@components/common/ToggleButton";
import Button from '@components/common/Button';

const keyObj: {[key: string]: string} = {
    isAlive: '생존 인물만',
    gender: '여자만',
    tvSeries: 'tvSeries 없음',
}


export default class SearchFilter extends Component{
    template(){
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

    generateChildComponent(target: HTMLElement, name: string, key: string) {
        const {searchParams} = this.props;

        if(name === 'ToggleButton' && key === 'isAlive'){
            return new ToggleButton(target, {
                value: !!searchParams.isAlive,
                label: '생존 인물만',
                name: key,
                onChange: (e: any) => {
                    this.props.handleSearchParamsChange({...searchParams, isAlive: e.target.checked});
                }
            })
        }

        if(name === 'ToggleButton' && key === 'gender'){
            return new ToggleButton(target, {
                value: searchParams.gender === 'Female',
                label: '여자만',
                name: key,
                onChange: (e: any) => {
                    this.props.handleSearchParamsChange({...searchParams, isAlive: e.target.checked});
                }
            })
        }

        if(name === 'ToggleButton' && key === 'noTvSeries'){
            console.log('key', searchParams);
            return new ToggleButton(target, {
                value: searchParams.noTvSeries,
                label: 'tvSeries 없음',
                name: key,
                onChange: (e: any) => {
                    this.props.handleSearchParamsChange({...searchParams, isAlive: e.target.checked});
                }
            })
        }

        if(name === 'Button'){
            return new Button(target, {
                text: '초기화',
                onClick: () => {
                    this.props.resetList();
                }
            })
        }
    }
}