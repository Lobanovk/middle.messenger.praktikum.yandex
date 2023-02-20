import { Component } from "../../core";
import { Dispatch } from "../../core/Store";
import { withStore } from "../../helpers/withStore";

type IncomingProps = {
  user: User;

  selectedUser: (user: User) => Dispatch<AppState>
}

type Props = IncomingProps & ComponentEvents
class ChatUserItem extends Component<Props> {
  static componentName = "ChatUserItem";
  constructor(props: IncomingProps) {
    super({
      ...props,
      events: {
        click: () => this.props.selectedUser(this.props.user)
      }
    });
  }

  protected render(): string {
    return `
      <div class="user-item">
        <div class="user-item__login"">{{user.login}}</div>
        <div class="user-item__name">{{user.secondName}} {{user.firstName}}</div>
      </div>
    `;
  }
}

export default withStore(ChatUserItem)(
  () => ({}),
  store => ({
    selectedUser: (user: User) => store.dispatch({ selectedUser: user })
  })
);
