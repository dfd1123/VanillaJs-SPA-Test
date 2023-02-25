import { updateElement } from "./componentUpdate";
import {setCurrentObserver, observable} from './observer'

let uid = 0;

export default class Component {
  $store;
  storeUseKeys = [];
  $state;
  $props;
  $target;
  components = [];
  reqAnimationId = 0;

  constructor($target, $props = {}) {
    this._uid = uid++;
    this.$target = $target;
    this.$props = $props;
    this.existChildComponent = false;

    this.$state = observable(this.data());
    this.create();
    this.render();
  }

  create() {}

  data(){
    return {};
  }

  template() {
    throw new Error("추상 메소드는 꼭 오버라이딩 되어야 합니다.");
  }

  componentDidMount() {}

  setEvent() {}

  render() {
    setCurrentObserver(this);
      const newNode = this.$target.cloneNode(true);
      newNode.innerHTML = this.template();

      const oldChildNodes = [ ...this.$target.childNodes ];
      const newChildNodes = [ ...newNode.childNodes ];
      const max = Math.max(oldChildNodes.length, newChildNodes.length);
      for (let i = 0; i < max; i++) {
        updateElement(this.$target, newChildNodes[i], oldChildNodes[i]);
      }

      this.componentDidMount();

      this.setEvent();
      setCurrentObserver(null);
  }

  useStore(store, key){
    this.$store = store;
    this.storeUseKeys.push(key);
  }

  observeFunc(key){
    if(!key || this.storeUseKeys.includes(key)){
      cancelAnimationFrame(this.reqAnimationId);
      this.reqAnimationId = requestAnimationFrame(this.render.bind(this));
    }
  }

  setState (newState) {
    Object.keys(newState).forEach(key => {
      this.$state[key] = newState[key];
    })
  }

  addComponent(compnentClass, props, key = -1) {
    const selectors = this.$target.querySelectorAll(`[${compnentClass.name}]`);
    const el = key !== -1 ? Array.from(selectors).find(selector => selector.getAttribute('key') === String(key)) : selectors[0];
    const componentKeyName = `${compnentClass.name}${key}`;

    const updateComponent = () => {
      const component = new compnentClass(el, props);
      component.updateElement = updateElement;
      this.components = {...this.components, [componentKeyName]: component};
    }

    if(el && !this.components[componentKeyName]) {
      updateComponent();
    }else if(el){
      if(!Object.is(this.components[componentKeyName].$props, props)){
        updateComponent();
      }
    }

  }

  addEvent(eventName, selector, func, option) {
    this.$target.querySelector(selector).removeEventListener(eventName, func, option);
    this.$target.querySelector(selector).addEventListener(eventName, func, option);
  }
}