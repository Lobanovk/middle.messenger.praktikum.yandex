import { Component } from "../../core";

type Props = {
  name?: string,
  DOMRect: DOMRect | null;
  setDOMRect: (event: MouseEvent) => void;
  onAddUser: () => void;
  onCloseUserModal: () => void;
  onDeleteChat: () => void;
  isVisibleAddUserModal: boolean;
}
class MessageContentInfo extends Component<Props>{
  static componentName = "MessageContentInfo";

  constructor() {
    super({
      name: "",
      DOMRect: null,
      isVisibleAddUserModal: false,
      setDOMRect: event => {
        const el = event.target as HTMLElement;
        if (this.props.DOMRect) {
          this.setProps({ DOMRect: null });
        } else {
          this.setProps({ DOMRect: el.getBoundingClientRect() });
        }
      },
      onAddUser: () => {
        this.setProps({ isVisibleAddUserModal: true, DOMRect: null });
      },
      onCloseUserModal: () => {
        this.setProps({ isVisibleAddUserModal: false });
      },
      onDeleteChat: () => {

      }
    });
  }
  protected render(): string {
    return `
      <div class="message-content__header">
        <div class="message-content__person">
          {{{Avatar}}}
          <h2 class="message-content__person-name">{{name}}</h2>
        </div>
        <div class="message-content__header-actions">
          {{#FabButton onClick=setDOMRect modification="fab-button_transparent fab-button_small"}}
            {{{MoreVertIcon className="chat-content__icon"}}}
          {{/FabButton}}
          {{#if DOMRect}}
            {{# Pane DOMRect=DOMRect type="right"  }}
              {{{Button
                  text="Добавить пользователя"
                  onClick=onAddUser
                  type="action"
              }}}
              {{{Button
                  text="Удалить чат"
                  onClick=onDeleteChat
                  type="action"
              }}}
            {{/ Pane}}
             {{/if}}
        </div>
        {{#if isVisibleAddUserModal}}
          {{{AddUserModal onClose=onCloseUserModal}}}
        {{/if}}
      </div>
    `;
  }
}

export default MessageContentInfo;
