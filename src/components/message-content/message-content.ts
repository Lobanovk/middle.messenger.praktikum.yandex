import { Component } from "core";
import personData from "../../data/person.json";

type IncomingProps = {
  id: number;
}

type Props = IncomingProps & {
  name?: string,
  messages?: Record<string, any>[]
}

export class MessageContent extends Component<Props> {
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
