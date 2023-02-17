import { Component } from "core";
import { withStore } from "../../helpers/withStore";
import { Dispatch } from "../../core/Store";

type IncomingProps = {
  name: string;
  lastMessage: Record<string, any>;
  messageCount: string;
  id: number;
  selectedIdChat: number | null;
  setSelectedIdChat: (id: number) => Dispatch<AppState>
}

type Props = {
  events: {
    click: (event: MouseEvent) => void;
  }
} & Omit<IncomingProps, "onClick">

class Person extends Component<Props>{
  static componentName = "Person";

  constructor(props: IncomingProps) {
    super({
      ...props,
      events: {
        click: () => props?.setSelectedIdChat(props.id)
      }
    });
  }

  protected render(): string {
    const isSelected = this.props.id === this.props.selectedIdChat ? "person__selected" : "";
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


export default withStore(Person)(
  store => ({
    selectedIdChat: store.getState().selectedIdChat
  }),
  store => ({
    setSelectedIdChat: (id: number) => store.dispatch(({ selectedIdChat: id }))
  })
);
