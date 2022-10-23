import { Component } from "core";

type IncomingProps = {
  onClick: (event: MouseEvent, component: Person) => void;
  name: string;
  time: string;
  lastMessageIsYour: boolean;
  messageCount: string;
  previewMessage: string;
  id: number;
  selectedId: number;
}

type Props = {
  events: {
    click: (event: MouseEvent) => void;
  }
} & Omit<IncomingProps, "onClick">

export class Person extends Component<Props>{
  static componentName = "Person";

  constructor({onClick, ...props}: IncomingProps) {
    super({
      ...props,
      events: {
        click: event => onClick(event, this)
      }
    });
  }

  protected render(): string {
    const isSelected = this.props.id === this.props.selectedId ? "person__selected" : "";
    return `
      <div class="divider">
        <div class="person ${isSelected}">
          <div class="person__content">
            <div class="person__avatar">
              {{{Avatar}}}
            </div>
            <div class="person__general-info">
                <div class="person__row">
                  <p class="person__name">{{name}}</p>
                  <p class="person__time">{{time}}</p>
                </div>
                <div class="person__row">
                  <p class="person__preview-message">
                    {{#if lastMessageIsYour}}<span class="person__prefix">Вы: </span>{{/if}}{{previewMessage}}
                  </p>
                  {{#if messageCount}}
                    <p class="person__message-count">{{messageCount}}</p>
                  {{/if}}
                </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
