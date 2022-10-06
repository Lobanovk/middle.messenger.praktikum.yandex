import {Component} from "../../core";

import './messages.css';

interface MessagesProps {
  messages: Record<string, string>
  time: string;
}

export class Messages extends Component{
  constructor(props: MessagesProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="messages">
          <div class="messages__time">{{ time }}</div>
          {{#each messages}}
              {{{CardMessage
                  attachment=this.attachment
                  text=this.text
                  isCurrentPerson=this.isCurrentPerson
                  time=this.time
              }}}
          {{/each}}
      </div>
    `
  }
}