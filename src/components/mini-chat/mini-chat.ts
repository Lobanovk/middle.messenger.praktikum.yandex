import {Component} from "core";

import "./mini-chat.css"

interface MiniChatProps {
  name: string;
  time: string;
  lastMessageIsYour: boolean;
  messageCount: string;
  previewMessage: string;
  id: number;
  selectedId: number;
  onClick: (event: MouseEvent, component: Component) => void;
}

export class MiniChat extends Component {
  constructor({onClick, ...props}: MiniChatProps) {
    super({...props, events: {
        click: (event: MouseEvent) => onClick(event, this)
    }});
  }

  protected render(): string {
    const isSelected = this.props.id === this.props.selectedId ? "mini-chat_selected" : ""
    return `
      <div>
        <div class="mini-chat ${isSelected}">
          <div class="mini-chat__content">
            <div class="mini-chat__avatar">
                {{{Avatar }}}
            </div>
          
            <div class="mini-chat__general-info">
              <div class="mini-chat__row">
                <p class="mini-chat__name">{{ name }}</p>
                <p class="mini-chat__time">
                {{ time }}
                </p>
              </div>
              <div class="mini-chat__row">
              <p class="mini-chat__preview-message">
                  {{#if lastMessageIsYour}} 
                      <span class="mini-chat__prefix">Вы: </span> 
                  {{/if}} {{ previewMessage }}
              </p>
              {{#if messageCount}}
                <p class="mini-chat__message-count">
                    {{messageCount}}
                </p>
              {{/if}}
              </div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
      </div>
    `
  }
}