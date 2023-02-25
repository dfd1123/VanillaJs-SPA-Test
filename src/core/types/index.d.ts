import Component from '../Component';

export interface StateType {
  [key: string]: any;
}

export interface EventListenerParams {
  eventName: string;
  selector: string;
  func: (this: Element, ev: Event) => any;
}

export interface RouteType<T extends Component = Component> {
  path: string;
  redirect?: string;
  view: new (el: Element, props?: StateType) => T;
}
