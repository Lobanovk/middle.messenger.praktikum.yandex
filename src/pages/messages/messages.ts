import { Component, Router } from "core";
import TextField from "components/inputs/text-field";
import chatsData from "../../data/chats.json";
import Person from "../../components/person";
import { withRouter } from "../../helpers/withRouter";
import { Screens } from "../../helpers/screenList";
import { withStore } from "../../helpers/withStore";
import { Store } from "../../core/Store";

type PageProps = {
  router: Router;
  store: Store<AppState>;
}

type Props = {
  person: any;
  onEmpty: () => void;
  isSelectedInputChat?: number;
  chats: Record<string, string>[];
  onGoToSettings: (event: MouseEvent) => void;
} & PageProps;

type Refs = {
  searchInputRef: TextField
}

class Messages extends Component<Props, Refs> {
  constructor(props: PageProps) {
    super({
      ...props,
      chats: [],
      isSelectedInputChat: undefined,
      onEmpty: () => {},
      person: 1,
      onGoToSettings: event => {
        event.preventDefault();
        this.props.router.go(Screens.Settings);
      }
    });
  }

  onSelectedChat = (_event: MouseEvent, component: Person) => {
    this.setProps({
      person: component.getProps().id,
      isSelectedInputChat: component.getProps().id,
    });
  };

  componentDidMount(_props: Props) {
    this.setProps({
      chats:  chatsData
        .map(
          (data: Record<string, any>, index: number) =>
            ({...data, onClick: this.onSelectedChat, id: index})
        )
    });
  }

  protected render(): string {
    return `
      {{#Wrapper type="chat"}}
        <div class="chats-list">
          <div class="chats-list__header">
            <div class="chats-list__link">
              {{{Link 
                text="Профиль"
                href="/settings"
                modification="link_profile"
                onClick=onGoToSettings
              }}}
            </div>
            <div class="chats-list__input-container">
                {{{TextField
                   ref="searchInputRef"
                   placeholder="Поиск"
                   inputClassName="chats-list__input-search"
                   modification="outlined"
                }}}
            </div>
          </div>
          <div class="chats-list__content">
            {{#each chats}}
                {{{Person
                    selectedId=${this.props.isSelectedInputChat}
                    id=this.id
                    name=this.name
                    time=this.time
                    lastMessageIsYour=this.lastMessageIsYour
                    messageCount=this.messageCount
                    previewMessage=this.previewMessage
                    onClick=this.onClick
                }}}
            {{/each}}
          </div>
        </div>
        {{#ChatWrapper}}
          {{#if person}}
           {{{MessageContent id=person}}}
          {{else}}
            <p class="chat__empty">Выберите чат чтобы отправить сообщение</p>
          {{/if}}
        {{/ChatWrapper}}
      {{/Wrapper}}
    `;
  }
}

export default withRouter(withStore(Messages));
