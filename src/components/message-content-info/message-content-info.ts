import { Component } from "../../core";
import { withStore } from "../../helpers/withStore";
import { deleteChat, getChatsUsers } from "../../services/chats";
import { Dispatch } from "../../core/Store";

type IncomingProps = {
  selectedNameChat?: string,
  selectedAvatarChat?: string;
  getUsersList: () => Dispatch<AppState>;
  removeChat: () => Dispatch<AppState>;
}

type ChangeStateModal = () => void;

type Props = {
  DOMRect: DOMRect | null;
  setDOMRect: (event: MouseEvent) => void;
  onChangeStateAddUserModal: ChangeStateModal;
  onChangeStateChangeAvatarModal: ChangeStateModal;
  onChangeStateDeleteUserModal: ChangeStateModal;
  oChangeStateDeleteChatModal: ChangeStateModal;
  isVisibleAddUserModal: boolean;
  isVisibleRemoveUserModal: boolean;
  isVisibleChangeAvatar: boolean;
} & IncomingProps
class MessageContentInfo extends Component<Props>{
  static componentName = "MessageContentInfo";

  constructor(props: IncomingProps) {
    super({
      ...props,
      DOMRect: null,
      isVisibleAddUserModal: false,
      isVisibleRemoveUserModal: false,
      isVisibleChangeAvatar: false,
      setDOMRect: event => {
        const el = event.target as HTMLElement;
        if (this.props.DOMRect) {
          this.setProps({ DOMRect: null });
        } else {
          this.setProps({ DOMRect: el.getBoundingClientRect() });
        }
      },
      onChangeStateAddUserModal: () => {
        if (this.props.isVisibleAddUserModal) {
          this.setProps({ isVisibleAddUserModal: false });
        } else {
          this.setProps({ isVisibleAddUserModal: true, DOMRect: null });
        }
      },
      onChangeStateChangeAvatarModal: () => {
        if (this.props.isVisibleChangeAvatar) {
          this.setProps({ isVisibleChangeAvatar: false });
        } else {
          this.setProps({ isVisibleChangeAvatar: true, DOMRect: null });
        }
      },
      onChangeStateDeleteUserModal: () => {
        if (this.props.isVisibleRemoveUserModal) {
          this.setProps({ isVisibleRemoveUserModal: false });
        } else {
          this.setProps({ isVisibleRemoveUserModal: true, DOMRect: null });
          this.props.getUsersList();
        }
      },
      oChangeStateDeleteChatModal: () => {
        this.props.removeChat();
      },
    });
  }
  protected render(): string {
    const avatar = this.props.selectedAvatarChat ? `https://ya-praktikum.tech/api/v2/resources${this.props.selectedAvatarChat}` : "";
    const component = `<div style="background: url('${avatar}'); width: 100%; height: 100%; background-size: cover; border-radius: inherit;"></div>`;
    return `
      <div class="message-content__header">
        <div class="message-content__person">
          {{#Avatar }}
            ${avatar ? component : ""}
          {{/Avatar }}
          <h2 class="message-content__person-name">{{selectedNameChat}}</h2>
        </div>
        <div class="message-content__header-actions">
          {{#FabButton onClick=setDOMRect modification="fab-button_transparent fab-button_small"}}
            {{{MoreVertIcon className="chat-content__icon"}}}
          {{/FabButton}}
          {{#if DOMRect}}
            {{# Pane DOMRect=DOMRect type="right"  }}
              {{{Button
                  text="Добавить пользователя"
                  onClick=onChangeStateAddUserModal
                  type="action"
                  className="pane-button"
              }}}
              {{{Button
                  text="Поменять аватар"
                  onClick=onChangeStateChangeAvatarModal
                  type="action"
                  className="pane-button"
              }}}
              {{{Button
                  text="Удалить пользователя"
                  onClick=onChangeStateDeleteUserModal
                  type="action"
                  className="pane-button pane-button_alert"
              }}}
              {{{Button
                  text="Удалить чат"
                  onClick=oChangeStateDeleteChatModal
                  type="action"
                  className="pane-button pane-button_alert"
              }}}
            {{/ Pane}}
             {{/if}}
        </div>
        {{#if isVisibleAddUserModal}}
          {{{AddUserModal onClose=onChangeStateAddUserModal}}}
        {{/if}}
        {{#if isVisibleChangeAvatar}}
          {{{SettingsModal type="chat" onClose=onChangeStateChangeAvatarModal}}}
        {{/if}}
        {{#if isVisibleRemoveUserModal}}
          {{{RemoveUserModal onClose=onChangeStateDeleteUserModal}}}
        {{/if}}
      </div>
    `;
  }
}

export default withStore(MessageContentInfo)(
  store => ({
    selectedNameChat: store.getState().selectedNameChat,
    selectedAvatarChat: store.getState().selectedAvatarChat,
  }),
  store => ({
    getUsersList: () => store.dispatch(getChatsUsers),
    removeChat: () => store.dispatch(deleteChat)
  })
);
