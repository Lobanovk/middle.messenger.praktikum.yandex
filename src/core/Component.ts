import {nanoid} from "nanoid";
import Handlebars from "handlebars";
import EventBus from "./EventBus";

type Events = Values<typeof Component.EVENTS>

type Props = { [key: string]: any }

export interface ComponentClass<P extends Props> extends Function {
  new (props: P): Component<P>;
  componentName?: string;
}

export default class Component<P extends Props, Refs extends Record<string, Component<any>> = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_CWU: "flow:component-will-unmount",
    FLOW_RENDER: "flow:render",
  } as const;

  public static componentName: string;

  public readonly id = nanoid(6);

  protected _element: Nullable<HTMLElement> = null;

  readonly props: P;
  protected children: {[id: string]: Component<object>} = {};

  eventBus: () => EventBus<Events>;

  // @ts-expect-error Тип {} не соответствует типу Record<string, Block<any>
  protected refs: Refs = {};

  constructor(props?: P) {
    const eventBus = new EventBus<Events>();

    this.props = this._makePropsProxy(props || {} as P);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Component.EVENTS.INIT, this.props);
  }

  getProps() {
    return this.props;
  }

  getRefs() {
    return this.refs;
  }

  get element(): Nullable<HTMLElement> {
    return this._element;
  }

  private _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
  }

  private _makePropsProxy(props: P): P & Props {
    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown> , p: string): any {
        const value = target[p];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target: Record<string, unknown>, p: string, newValue: any): boolean => {
        if (target[p] === newValue) {
          return true;
        }
        target[p] = newValue;
        this.eventBus().emit(Component.EVENTS.FLOW_CDU, {...target}, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    }) as unknown as P & Props;
  }

  init() {
    this._createResources();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER, this.props);
  }

  private _createResources() {
    this._element = this._createDocumentElement("div");
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _checkInDom() {
    const elementInDOM = document.body.contains(this._element);

    if (elementInDOM) {
      setTimeout(() => this._checkInDom(), 1000);
      return;
    }

    this.eventBus().emit(Component.EVENTS.FLOW_CWU, this.props);
  }

  private _componentDidMount() {
    this._checkInDom();

    this.componentDidMount(this.props);
  }

  componentDidMount(_props: P): void {

  }

  private _componentDidUpdate(oldProps: P, newProps: P): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this._render();
  }

  componentDidUpdate(_oldProps: P, _newProps: P): boolean {
    return true;
  }

  _componentWillUnmount() {
    this.eventBus().destroy();
    this.componentWillUnmount();
  }

  componentWillUnmount() {}

  setProps(nextProps: Partial<P>): void {
    if(!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  private _checkChildrenInDOM() {
    for (const key in this.children) {
      if (!document.body.contains(this.children[key].element)) {
        delete this.children[key];
      }
    }
  }
  private _render(): void {
    const fragment = this._compile();

    this._removeEvents();

    const newEl = fragment.firstElementChild;
    this._element!.replaceWith(newEl!);

    this._element = newEl as HTMLElement;
    this._addEvents();

    this._checkChildrenInDOM();
  }

  private _removeEvents(): void {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  private _addEvents(): void {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  protected render(): string {
    return "";
  }

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.eventBus().emit(Component.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  _compile() {
    const fragment = document.createElement("template");

    const template = Handlebars.compile(this.render());

    fragment.innerHTML = template({ ...this.props, children: this.children, refs: this.refs });

    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChild = stub.childNodes.length ? stub.childNodes : [];

      const content = component.getContent();
      stub.replaceWith(content);

      const layoutContent = content.querySelector("[data-layout=\"1\"]");
      const slotContent = content.querySelector("[data-slot=\"1\"]");

      if (layoutContent && stubChild.length) {
        layoutContent.append(...stubChild);
      }

      if (slotContent && stubChild.length) {
        slotContent.parentNode?.append(...stubChild);
        slotContent.remove();
      }
    });

    return fragment.content;
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }

}
