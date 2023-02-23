import Component from './Component';


export function adjustChildComponents(parent: Component, childComponentData: {[key: string]: string}) {
  const { childComponents = {} } = parent; 
  for (let componentKeyName of Object.keys(childComponents)) {
    if (childComponentData[componentKeyName]) {
      const target = findComponentNode(parent.target, componentKeyName)
      childComponents[componentKeyName].update(target);
      delete childComponentData[componentKeyName];
    }
    else {
      // childComponents[key].destroyComponent();
      delete childComponents[componentKeyName]
    }
  }

  for (let [componentKeyName] of Object.entries(childComponentData)) {
    const [componentName, key = ''] = getOnlyKey(componentKeyName);

    const target = findComponentNode(parent.target, componentKeyName);
    const childComponent = parent.generateChildComponent(target, componentName, key);
    if (!childComponent) throw new Error(`Cannot generate component with name '${key}' at '${parent.target.dataset.componentName ?? "App"}'`);
    childComponents[key] = childComponent;
  }
}

function findComponentNode(targetNode: HTMLElement, componentKeyName: string): HTMLElement {
  const [componentName, key = ''] = getOnlyKey(componentKeyName);
  const selectors = targetNode.querySelectorAll(`[data-component="${componentName}"]`);
  const el = key !== '' ? [...selectors].find(selector => selector.getAttribute('key') === key) : selectors[0];

  return el as HTMLElement;
}

function getOnlyKey(componentKeyName: string): [string, string] {
  const [componentName, key = ''] = componentKeyName.split('#');

  return [componentName, key]
}