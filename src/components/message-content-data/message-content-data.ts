import { Component } from "core";
import { withStore } from "../../helpers/withStore";
import { createSocketConnection } from "../../services/socket";
import { Dispatch } from "../../core/Store";

type IncomingProps = {
  createConnection: () => Dispatch<AppState>
};

type Props = IncomingProps;
class MessageContentData extends Component<Props> {
  static componentName = "MessageContentData";
  constructor(props: IncomingProps) {
    super({
      ...props,
    });
  }

  componentDidMount(_props: Props) {
    super.componentDidMount(_props);
    _props.createConnection();
  }

  protected render(): string {
    return `
      <div class="message-content__main">
        {{{MessagesList}}}
      </div>
    `;
  }
}

export default withStore(MessageContentData)(
  () => ({}),
  store => ({
    createConnection: () => store.dispatch(createSocketConnection),
  })
);

//        {{#each messages}}
//           {{{MessageData
//               time=this.time
//               messages=this.messages
//           }}}
//         {{/each}}
