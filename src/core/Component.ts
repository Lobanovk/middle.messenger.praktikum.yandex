import {nanoid} from "nanoid";
import Handlebars from "handlebars";
import EventBus from "./EventBus";

type Events = Values<typeof Component.EVENTS>

interface MetaComponent<P = any> {
  props: P
}

export default class Component<P extends {[key: string]: any} = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  static componentName: string;

  public readonly id = nanoid(6);

  private readonly _meta: MetaComponent
  protected _element: Nullable<HTMLElement> = null;

  readonly props: P;
  protected children: {[id: string]: Component} = {};

  eventBus: () => EventBus<Events>

  protected refs: { [key: string]: Component } = {};

  constructor(props?: P) {
    const eventBus = new EventBus<Events>();

    this._meta = {
      props
    }

    this.props = this._makePropsProxy(props || {} as P);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Component.EVENTS.INIT, this.props);
  }

  get element(): Nullable<HTMLElement> {
    return this._element;
  }

  private _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _makePropsProxy(props: P) {
    const self = this;
    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown> , p: string): any {
        const value = target[p];
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target: Record<string, unknown>, p: string, newValue: any): boolean {
        target[p] = newValue;
        self.eventBus().emit(Component.EVENTS.FLOW_CDU, {...target}, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      }
    }) as unknown as P
  }

  init() {
    this._createResources();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER, this.props);
  }

  private _createResources() {
    this._element = this._createDocumentElement('div');
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private _componentDidMount(props: P) {
    this.componentDidMount(props)
  }

  componentDidMount(props: P): void {

  }

  private _componentDidUpdate(oldProps: P, newProps: P): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this._render();
  }

  componentDidUpdate(oldProps: P, newProps: P): boolean {
    return true;
  }

  setProps(nextProps: P): void {
    if(!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  private _render(): void {
    const fragment = this._compile();

    this._removeEvents();

    const newEl = fragment.firstElementChild;
    this._element!.replaceWith(newEl!);

    this._element = newEl as HTMLElement;
    this._addEvents();
  }

   private _removeEvents(): void {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    })
  }

  private _addEvents(): void {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    })
  }

  protected render(): string {
    return ''
  }

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.eventBus().emit(Component.EVENTS.FLOW_CDM);
        }
      }, 100)
    }

    return this.element!;
  }

  _compile() {
    const fragment = document.createElement('template');

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

      const layoutContent = content.querySelector(`[data-layout="${this.props?.layoutId}"]`);

      if (layoutContent && stubChild.length) {
        layoutContent.append(...stubChild);
      }
    })

    return fragment.content;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

}