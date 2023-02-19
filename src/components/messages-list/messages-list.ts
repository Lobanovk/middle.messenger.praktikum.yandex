import { Component } from "../../core";
import { withStore } from "../../helpers/withStore";

type IncomingProps = {
  messages: Message[],
}

type Props = IncomingProps
class MessagesList extends Component<Props> {
  static componentName = "MessagesList";
  constructor(props: IncomingProps) {
    super(props);
  }

  protected render(): string {
    console.log(this.props.messages);
    return `
    <div>
        {{#each messages}}
          {{{MessageDataItem
            message=this
          }}}
        {{/each}}
        </div>
    `;
  }

}

export default withStore(MessagesList)(
  store => ({
    messages: store.getState().messages,
  })
);
