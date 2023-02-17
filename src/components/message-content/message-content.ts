import { Component } from "core";
import personData from "../../data/person.json";
import { withStore } from "../../helpers/withStore";

type IncomingProps = {
  selectedIdChat: number | null;
}

type Props = IncomingProps & {
  name?: string,
  messages?: Record<string, any>[]
}

class MessageContent extends Component<Props> {
  static componentName = "MessageContent";

  constructor(props: IncomingProps) {
    super({
      ...props,
      name: "",
      messages: [],
    });
  }

  componentDidMount() {
    this.setProps({
      name: personData.personName,
      messages: personData.messages
    });
  }

  protected render(): string {
    if (!this.props.selectedIdChat) {
      return "<p class=\"chat__empty\">Выберите чат чтобы отправить сообщение</p>";
    }
    return `
      <div class="message-content">
        <div class="message-content__header">
          <div class="message-content__person">
            {{{Avatar}}}
            <h2 class="message-content__person-name">{{name}}</h2>
          </div>
          <div class="message-content__header-actions">
            {{#FabButton modification="fab-button_transparent fab-button_small"}}
              {{{MoreVertIcon className="chat-content__icon"}}}
            {{/FabButton}}
          </div>
        </div>
        <div class="message-content__main">
          {{#each messages}}
            {{{MessageData
                time=this.time
                messages=this.messages
            }}}
          {{/each}}
        </div>
        {{{MessageForm}}}
      </div>
    `;
  }
}

export default withStore(MessageContent)(
  store => ({
    selectedIdChat: store.getState().selectedIdChat
  })
);
