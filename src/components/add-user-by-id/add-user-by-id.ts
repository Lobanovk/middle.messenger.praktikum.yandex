import { Component } from "../../core";
import { withStore } from "../../helpers/withStore";
import { addUserInChat, deleteUserFromChat } from "../../services/chats";
import { Dispatch } from "../../core/Store";

type IncomingProps = {
  user: User | null;
  onClose: () => void;
  addUser: () => Dispatch<AppState>
  removeUser: () => Dispatch<AppState>
  type: "add" | "remove"
  text: string;
}

type Props = Omit<IncomingProps, "onClose"> & {
  onSubmit: (event: SubmitEvent) => void;
}
class AddUserById extends Component<Props> {
  static componentName = "AddUserById";
  constructor({ onClose, ...props }: IncomingProps) {
    super({
      ...props,
      onSubmit: event => {
        event.preventDefault();
        if (this.props.type === "add")
          props.addUser();
        if (this.props.type === "remove")
          props.removeUser();
        onClose();
      }
    });
  }

  protected render(): string {
    return `
      {{#Form className="add-user-by-id" onSubmit=onSubmit }}
        <div class="add-user-by-id__user">
            {{#if user}}
              <div class="add-user-by-id__user-login">{{user.login}}</div>
              <div class="add-user-by-id__user-name">{{user.firstName}} {{user.secondName}}</div>
            {{/if}}
        </div>
        {{{Button text=text className="search-users-by-login__button"}}}
      {{/Form}}
    `;
  }
}

export default withStore(AddUserById)(
  store => ({
    user: store.getState().selectedUser
  }),
  store => ({
    addUser: () => store.dispatch(addUserInChat),
    removeUser: () => store.dispatch(deleteUserFromChat)
  })
);
