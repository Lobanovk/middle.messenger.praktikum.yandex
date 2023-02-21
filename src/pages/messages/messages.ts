import { Component } from "core";
import { withStore } from "../../helpers/withStore";


class Messages extends Component<any> {
  constructor() {
    super();
  }


  protected render(): string {
    return `
      {{#Wrapper type="chat"}}
        {{{ Chats }}}
        {{#ChatWrapper}}
           {{{MessageContent}}}
        {{/ChatWrapper}}
      {{/Wrapper}}
    `;
  }
}

export default withStore(Messages)(() => ({}));
