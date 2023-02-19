import { Component } from "../../core";
import { withStore } from "../../helpers/withStore";
import { addUserInChat } from "../../services/chats";
import { Store } from "../../core/Store";

type IncomingProps = {
  user: User | null;
  onClose: () => void;
  addUser: () => Store<AppState>["dispatch"]
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
        props.addUser();
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
        {{{Button text="Добавить" className="search-users-by-login__button"}}}
      {{/Form}}
    `;
  }
}

export default withStore(AddUserById)(
  store => ({
    user: store.getState().selectedUser
  }),
  store => ({
    addUser: () => store.dispatch(addUserInChat)
  })
);
