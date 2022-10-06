import {Component} from "../../core";

import './chat-content.css'

interface ChatContentProps {
  personName: string;
  messages: Record<string, string>[]
}

export class ChatContent extends Component{
  constructor(props: ChatContentProps) {
    super({
      ...props,
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();
        const messageRef = this.refs.formChatContentRef.getRefs().messageRef;
        if (messageRef.getRefs().errorRef.getProps().message) {
          console.log("error");
          return;
        }
        console.log(messageRef.getProps().value)
      }
    });
  }

  protected render(): string {
    return `
    <div class="chat-content">
        <div class="chat-content__header">
          <div class="chat-content__person">
              {{{Avatar }}}
              <h2 class="chat-content__person-name"> {{ personName }} </h2>
          </div>
          <div class="chat-content__header-actions">
              {{#FabButton modification="fab-button_transparent fab-button_small"}}
                  {{{SvgIcon type="more-vert" className="chat-content__icon"}}}
              {{/FabButton}}
          </div>
        </div>
        <div class="chat-content__main">
        {{#each messages}}
            {{{Messages
                messages=this.messages
                time=this.time
            }}}
        {{/each}}
        </div>
        {{{FormChatContent
            ref="formChatContentRef"
            onSubmit=onSubmit
        }}}
    </div>
    `
  }
}