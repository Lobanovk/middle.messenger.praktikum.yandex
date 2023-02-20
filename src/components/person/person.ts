import { Component } from "core";
import { withStore } from "../../helpers/withStore";
import { Dispatch } from "../../core/Store";

type IncomingProps = {
  user: User;
  name: string;
  lastMessageContent: string;
  lastMessageUser: string;
  messageCount: string;
  avatar: string;
  id: number;
  selectedIdChat: number | null;
  setSelectedChatInformation: (data: { id: number, name: string, avatar: string }) => Dispatch<AppState>
}

type Props = {
  events: {
    click: (event: MouseEvent) => void;
  }
} & Omit<IncomingProps, "onClick">

class Person extends Component<Props>{
  static componentName = "Person";

  constructor(props: IncomingProps) {
    super({
      ...props,
      events: {
        click: () =>
          props?.setSelectedChatInformation({
            id: props.id,
            name: props.name,
            avatar: props.avatar,
          })
      }
    });
  }

  protected render(): string {
    const isSelected = this.props.id === this.props.selectedIdChat ? "person__selected" : "";
    const lastMessageYours =
      this.props.lastMessageUser === this.props.user.login ?
        "<span class=\"person__prefix\">Вы: </span>" : "";
    return `
      <div class="divider">
        <div class="person ${isSelected}">
          <div class="person__content">
            <div class="person__avatar">
              {{{Avatar}}}
            </div>
            <div class="person__general-info">
                <div class="person__row">
                  <p class="person__name">{{name}}</p>
                  <p class="person__time">{{time}}</p>
                </div>
                <div class="person__row">
                  <p class="person__preview-message">
                    ${lastMessageYours}{{lastMessageContent}}
                  </p>
                  {{#if messageCount}}
                    <p class="person__message-count">{{messageCount}}</p>
                  {{/if}}
                </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}


export default withStore(Person)(
  store => ({
    selectedIdChat: store.getState().selectedIdChat,
    user: store.getState().user
  }),
  store => ({
    setSelectedChatInformation: (data: { id: number, name: string, avatar: string }) =>
      store.dispatch(({ selectedIdChat: data.id, selectedNameChat: data.name, selectedAvatarChat: data.avatar }))
  })
);
