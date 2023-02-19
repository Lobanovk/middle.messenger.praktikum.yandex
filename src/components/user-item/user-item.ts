import { Component } from "../../core";
import { Store } from "../../core/Store";
import { withStore } from "../../helpers/withStore";

type IncomingProps = {
  setSelectedUserId: (user: User) => Store<AppState>["dispatch"];

  user: User;
}

type Props = IncomingProps & ComponentEvents
class UserItem extends Component<Props> {

  static componentName = "UserItem";
  constructor(props: IncomingProps) {
    super({
      ...props,
      events: { click: () => { this.props.setSelectedUserId(this.props.user); } }
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

export default withStore(UserItem)(
  () => ({}),
  store => ({
    setSelectedUserId: (user: User) => store.dispatch({ selectedUser: user, usersList: [] })
  })
);
