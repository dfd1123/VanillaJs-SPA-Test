import "./style.scss";
import Component from "@/newCore/Component"
import LabelItem from '@components/common/LabelItem';
import Button from '@components/common/Button';

type InfoType = { label: string; value: string; }
type StateType = {
    topInfo: InfoType[];
    title: InfoType;
    bottomInfo: InfoType[];
}

export default class ListItem extends Component{
    data(): StateType{
        const item = this.props.item;
        return {
            topInfo: [
                {label: 'name', value: item.name || '-'},
                {label: 'aliases', value: (item.aliases || []).join(', ') || '-'},
            ],
            title: {label: 'title', value: (item.titles || []).join(', ') || '-'},
            bottomInfo: [
                {label: 'books', value: (item.books || []).length},
                {label: 'tvSeries', value: (item.tvSeries || []).length},
            ]
        }
    }

    template(){
        return `
            <div class="info-area">
                <div class="top-info">
                    ${this.state.topInfo.map((info) => `<div key="${info.label}" data-component="LabelItem"></div>`).join('')}
                </div>
                <b key="${this.state.title.label}"  data-component="LabelItem" class="title"></b>
                <div class="bottom-info">
                    ${this.state.bottomInfo.map((info) => `<div key="${info.label}"  data-component="LabelItem"></div>`).join('')}
                </div>
            </div>
            <div  data-component="Button" class="btn-delete"></div>
        `
    }

    generateChildComponent(target: HTMLElement, name: string, key: string) {
        const {topInfo, bottomInfo, title} = this.state;
        const {deleteItem} = this.props;

        const labelItem = [...topInfo, ...bottomInfo, title].find(obj => obj.label === key);

        if(name === 'Button'){
            return new Button(target, {
                text: '삭제',
                onClick: () => {
                    console.log('tkr')
                    deleteItem && deleteItem();
                }
            })
        }

        if(labelItem && name === 'LabelItem'){
            return new LabelItem(target, {
                info: labelItem,
            })
        }
    }
}