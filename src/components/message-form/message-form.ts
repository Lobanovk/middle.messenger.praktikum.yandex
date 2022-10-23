import { Component } from "core";
import ControlledTextField from "../inputs/controlled-text-field";

type Props = {
  onSubmit: (event: SubmitEvent) => void;
}

type Refs = {
  messageRef: ControlledTextField
}

export class MessageForm extends Component<Props, Refs> {
  static componentName = "MessageForm";

  constructor() {
    super({
      onSubmit: (event) => {
        event.preventDefault();
        const error = !!this.refs.messageRef.getRefs().errorRef.getProps().message;
        if (error) {
          console.log("error");
          return;
        }
        console.log(this.refs.messageRef.getProps().value);
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
              inputClassName="form-chat-content__input-message"
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
