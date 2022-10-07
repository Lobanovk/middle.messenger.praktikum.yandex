import Component from './Component';

export default function renderDOM(component: Component) {
  const root = document.querySelector('#root');

  root!.innerHTML = '';
  root!.appendChild(component.getContent());
}