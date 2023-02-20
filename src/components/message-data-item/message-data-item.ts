import { Component } from "core";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import photo from "../../asserts/photo.jpg";
import { withStore } from "../../helpers/withStore";

type IncomingProps = {
  user: User;
  message: Message
}

class MessageDataItem extends Component<IncomingProps> {
  static componentName = "MessageDataItem";

  constructor(props: IncomingProps) {
    super(props);
  }

  protected render(): string {
    const isMessageYours = this.props.user.id === +this.props.message.userId;
    const classNamePrefix = isMessageYours ? "current" : "other";

    return `
      <div class="message-data-item message-data-item_${classNamePrefix}">
        <div class="message-data-item__wrapper message-data-item__wrapper_{{#if attachment}}attachment{{/if}} message-data-item__wrapper_${classNamePrefix}">
              <p class="message-data-item__message">{{message.content}}</p>
              <div class="message-data-item__time"> 
                {{message.time}}
              </div>
          </div>
      </div>
    `;
  }
}

export default withStore(MessageDataItem)(
  store => ({
    user: store.getState().user
  })
);
//
// {{#if attachment}}
// <img class="message-data-item__attachment" src="${photo}" />
//   {{/if}}


// {{#if isCurrentPerson}}
// {{{DoubleCheckIcon className="message-data-item__time-icon"}}}
// {{/if}}
