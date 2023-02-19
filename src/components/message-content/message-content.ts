import { Component } from "core";
import { withStore } from "../../helpers/withStore";

type IncomingProps = {
  selectedIdChat: number | null;
}

type Props = IncomingProps

class MessageContent extends Component<Props> {
  static componentName = "MessageContent";

  constructor(props: IncomingProps) {
    super({
      ...props,
    });
  }

  protected render(): string {
    if (!this.props.selectedIdChat) {
      return "<p class=\"chat__empty\">Выберите чат чтобы отправить сообщение</p>";
    }
    return `
      <div class="message-content">
        {{{MessageContentInfo}}}
        {{{MessageContentData}}}
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
