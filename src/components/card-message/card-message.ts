import {Component} from "../../core";

import './card-message.css';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import photo from "../../asserts/photo.jpg";

interface CardMessageProps {
  attachment: string;
  text: string;
  isCurrentPerson: boolean;
  time: string;
}

export class CardMessage extends Component{
  constructor(props: CardMessageProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="message-pane message-pane_{{#if isCurrentPerson}}current{{else}}other{{/if}}">
          <div class="message-pane__wrapper message-pane__wrapper_{{#if attachment}}attachment{{/if}} message-pane__wrapper_{{#if isCurrentPerson}}current{{else}}other{{/if}}">
              {{#if attachment}}
                  <img class="message-pane__attachment" src="${photo}" />
              {{/if}}
              {{#if text}}
                  <p class="message-pane__message">{{ text }}</p>
              {{/if}}
              <div class="message-pane__time"> 
                  {{#if isCurrentPerson}}
                      {{{SvgIcon type="double-check" className="message-pane__time-icon"}}}
                  {{/if}}
                  {{ time }}
                </div>
          </div>
      </div>
    `
  }
}
