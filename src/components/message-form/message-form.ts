import { Component } from "core";
import ControlledTextField from "../inputs/controlled-text-field";

import { withStore } from "../../helpers/withStore";
import WebSocketTransport from "../../core/WebSocketTransport";

type IncomingProps = {
  socket: WebSocketTransport;
}

type Props = {
  onSubmit: (event: SubmitEvent) => void;
} & IncomingProps;

type Refs = {
  messageRef: ControlledTextField
}

class MessageForm extends Component<Props, Refs> {
  static componentName = "MessageForm";

  constructor(props: IncomingProps) {
    super({
      ...props,
      onSubmit: (event) => {
        event.preventDefault();
        const error = !!this.refs.messageRef.getRefs().errorRef.getProps().message;
        const value = this.refs.messageRef.getProps().value;
        if (!value?.length) {
          this.refs.messageRef.getRefs().errorRef.setProps({ message: "Сообщение не должно быть пустым" });
          return;
        }
        if (error) {
          console.log("error");
          return;
        }
        this.props.socket?.sendMessage({
          type: "message",
          content: this.refs.messageRef.getProps().value as string
        });
      }
    });
  }

  protected render(): string {
    return `
      {{#Form onSubmit=onSubmit className="message-form"}}
        {{#FabButton modification="fab-button_transparent fab-button_small"}}
          {{{ClipIcon className="form-chat-content__icon"}}}
        {{/FabButton}}
        <div class="message-form__input-message-container">
          {{{
            ControlledTextField
              name="message"   
              placeholder="Введите сообщение"
              ref="messageRef"
              modification="outlined"
              inputClassName="form-chat-content__input-message message-form__input-message"
              value=""
          }}}
        </div>
        {{#FabButton type="submit" modification="fab-button_small fab-button_white-icon"}}
          {{{ArrowRightIcon}}}
        {{/FabButton}}
      {{/Form}}
    `;
  }
}

export default withStore(MessageForm)(
  store => ({
    socket: store.getState().socket
  })
);
