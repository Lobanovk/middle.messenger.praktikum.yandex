import { Component } from "../../core";
import { withStore } from "../../helpers/withStore";

type IncomingProps = {
  usersList: User[];
}

type Props = IncomingProps;
class UsersList extends Component<Props> {
  static componentName = "UsersList";
  constructor(props: IncomingProps) {
    super({ ...props });
  }

  protected render(): string {
    if (this.props.usersList.length) {
      return `
        <div class="users-list">
          {{#each usersList}}
              {{{UserItem
                  user=this
              }}}
          {{/each}}
        </div>
      `;
    }
    return "<div style=\"display: none\"></div>";
  }

}

export default withStore(UsersList)(
  store => ({
    usersList: store.getState().usersList
  }),
);
