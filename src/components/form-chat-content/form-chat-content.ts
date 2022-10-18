import {Component} from "../../core";

import './form-chat-content.css'

interface FormChatContentProps {
  onSubmit: () => void;
}

export class FormChatContent extends Component{
  constructor({onSubmit, ...props}: FormChatContentProps) {
    super({
      ...props,
      modifications: ["outlined"],
      inputProps: {
        className: "form-chat-content__input-message"
      },
      events: {
        submit: onSubmit
      }
    });
  }

  protected render(): string {
    return `
     <form class="form-chat-content">
        {{#FabButton modification="fab-button_transparent fab-button_small"}}
            {{{SvgIcon type="clip" className="form-chat-content__icon"}}}
        {{/FabButton}}
        <div class="form-chat-content__input-message-container">
          {{{ControlledTextField 
            name="message"   
            placeholder="Введите сообщение"
            ref="messageRef"
            modifications=modifications
            inputProps=inputProps
            value=""
          }}}
        </div>
        {{#FabButton 
            type="submit" 
            modification="fab-button_small fab-button_white-icon"
        }}
          {{{SvgIcon type="arrow-right"}}}
        {{/FabButton}}
     </form>
    `
  }

}