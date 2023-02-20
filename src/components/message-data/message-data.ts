import { Component } from "core";

type IncomingProps = {
  time: string;
  messages: Record<string, string>
}

export class MessageData extends Component<IncomingProps> {
  static componentName = "MessageData";

  constructor(props: IncomingProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="message-data">
        <div class="message-data__time">{{time}}</div>
        {{#each messages}}
          {{{MessageDataItem
            attachment=this.attachment
            text=this.text
            isCurrentPerson=this.isCurrentPerson
            time=this.time
          }}}
        {{/each}}
      </div>
    `;
  }
}
