import { Component } from "../../core";
import { withStore } from "../../helpers/withStore";
import { Screens } from "../../helpers/screenList";
import TextField from "../inputs/text-field";
import { ChatRequestData } from "../../api/chats";
import { getList } from "../../services/chats";
import { Dispatch } from "../../core/Store";

type IncomingProps = {
  chats: Chat[];
  getChatsList: (data?: ChatRequestData) => Dispatch<AppState>;
}

type Props = {
  onGoToSettings: (event: MouseEvent) => void;
  DOMRect: DOMRect | null;
  setDOMRect: (event: MouseEvent) => void;
  onCreateNewChat: (event: MouseEvent) => void;
  isVisibleModal: boolean;
  onClose: () => void;
} & IncomingProps;

type Refs = {
  searchInputRef: TextField
}
class Chats extends Component<Props, Refs> {
  static componentName = "Chats";

  constructor(props: IncomingProps) {
    super({
      ...props,
      isVisibleModal: false,
      DOMRect: null,
      onCreateNewChat: () => {
        this.setProps({ DOMRect: null, isVisibleModal: true });
      },
      onGoToSettings: event => {
        event.preventDefault();
        window.router.go(Screens.Settings);
      },
      setDOMRect: event => {
        const el = event.target as HTMLElement;
        if (this.props.DOMRect) {
          this.setProps({ DOMRect: null });
        } else {
          this.setProps({ DOMRect: el.getBoundingClientRect() });
        }
      },
      onClose: () => {
        this.setProps({ isVisibleModal: false });
      }
    });
  }

  componentDidMount(_props: Props) {
    _props.getChatsList();
  }
  protected render(): string {
    return `        
        <div class="chats-list">
          <div class="chats-list__header">
            <div class="chats-list__input-container">
              {{{TextField
                 ref="searchInputRef"
                 placeholder="Поиск"
                 inputClassName="chats-list__input-search"
                 className="chats-list__text-field"
                 modification="outlined"
              }}}
              {{#FabButton onClick=setDOMRect modification="fab-button_transparent fab-button_small"}}
                {{{MoreVertIcon className="chat-content__icon"}}}
              {{/FabButton}}
              {{#if DOMRect}}
              {{# Pane DOMRect=DOMRect  }}
                {{{Link
                  text="Профиль"
                  href="/settings"
                  modification="link_profile"
                  onClick=onGoToSettings
                }}}
                {{{Button
                    text="Новый чат"
                    onClick=onCreateNewChat
                    type="action"
                }}}
              {{/ Pane}}
              {{/if}}
            </div>
          </div>
          <div class="chats-list__content">
<!--            // todo поменять в Person логику lastMessage-->
            ${ this.props.chats.reduce((components, chat) => components += `
              {{{Person
                id=${chat.id}
                name="${chat.title}"
                messageCount=${chat.unreadCount}
                lastMessage=${chat.lastMessage}
              }}}
              `, "") }
          </div>
          {{#if isVisibleModal}}
            {{{ChatModal onClose=onClose}}}
          {{/if}}
        </div>`;
  }
}

export default withStore(Chats)(
  store => ({
    chats: store.getState().chats,
  }),
  store => ({
    getChatsList: (data: ChatRequestData) => store.dispatch(getList, data),
  })
);
