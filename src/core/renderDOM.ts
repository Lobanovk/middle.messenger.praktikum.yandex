import Component from "./Component";

export default function renderDOM(component: Component<any>) {
  const root = document.querySelector("#root");

  root!.textContent = "";
  root!.appendChild(component.getContent());
}
