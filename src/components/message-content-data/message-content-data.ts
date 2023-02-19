import { Component } from "core";
import { withWebSocket } from "../../helpers/withWebSocket";

type IncomingProps = any;

type Props = IncomingProps & {
  messages?: Record<string, any>[]
};
class MessageContentData extends Component<Props> {
  static componentName = "MessageContentData";
  constructor(props: IncomingProps) {
    super({
      ...props,
      messages: []
    });
  };

  protected render(): string {
    return `
      <div class="message-content__main">
        {{#each messages}}
          {{{MessageData
              time=this.time
              messages=this.messages
          }}}
        {{/each}}
      </div>
    `;
  }
}

export default withWebSocket(MessageContentData);
