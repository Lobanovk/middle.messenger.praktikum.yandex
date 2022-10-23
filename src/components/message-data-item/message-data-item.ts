import { Component } from "core";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import photo from "../../asserts/photo.jpg";

type IncomingProps = {
  attachment: string;
  text: string;
  isCurrentPerson: boolean;
  time: string;
}

export class MessageDataItem extends Component<IncomingProps> {
  static componentName = "MessageDataItem";

  constructor(props: IncomingProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="message-data-item message-data-item_{{#if isCurrentPerson}}current{{else}}other{{/if}}">
        <div class="message-data-item__wrapper message-data-item__wrapper_{{#if attachment}}attachment{{/if}} message-data-item__wrapper_{{#if isCurrentPerson}}current{{else}}other{{/if}}">
              {{#if attachment}}
                <img class="message-data-item__attachment" src="${photo}" />
              {{/if}}
              {{#if text}}
                <p class="message-data-item__message">{{text}}</p>
              {{/if}}
              <div class="message-data-item__time"> 
                {{#if isCurrentPerson}}
                    {{{DoubleCheckIcon className="message-data-item__time-icon"}}}
                {{/if}}
                {{time}}
              </div>
          </div>
      </div>
    `;
  }
}
