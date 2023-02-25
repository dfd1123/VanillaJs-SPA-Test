import { observable } from './observer';

export class Store<S extends Record<string, any> = object> {
  public state: S;
  private mutations: { [key: string]: (state: S, payload: any) => void };

  constructor({
    state = {} as S,
    mutations,
  }: {
    state: S;
    mutations: { [key: string]: (state: S, payload: any) => void };
  }) {
    this.state = observable(state, true);
    this.mutations = mutations;
  }

  commit(action: string, payload: any) {
    this.mutations[action](this.state, payload);
  }
}
