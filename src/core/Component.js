import { updateElement } from "./componentUpdate";

let uid = 0;

export default class Component {
  $state;
  $props;
  $target;
  components = [];

  constructor($target, $props = {}) {
    this._uid = uid++;
    this.$target = $target;
    this.$props = $props;
    this.existChildComponent = false;

    this.setup();
    this.render();
  }

  setup() {};
  template() {
    throw new Error("추상 메소드는 꼭 오버라이딩 되어야 합니다.");
  }; // 렌더링 할 HTML 반환
  componentDidMount() {}; // 렌더링 직후 수행해야 할 로직
  setEvent() {}; // 이벤트 세팅

  render() {
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
  
  }

  setState (newState) {
    this.$state = { ...this.$state, ...newState };
    this.render(); // state가 변경되면 재렌더링 수행
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