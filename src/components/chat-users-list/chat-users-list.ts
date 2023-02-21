import { Component } from "../../core";
import { withStore } from "../../helpers/withStore";

type IncomingProps = {
  usersList: User[];
}

type Props = IncomingProps
class ChatUsersList extends Component<Props> {
  static componentName = "ChatUsersList";

  constructor(props: IncomingProps) {
    super({
      ...props
    });
  }
  protected render(): string {
    if (this.props.usersList.length) {
      return `
        <div class="chat-users-list">
          {{#each usersList}}
              {{{ChatUserItem
                  user=this
              }}}
          {{/each}}
        </div>
      `;
    }
    return "<div style=\"display: none\"></div>";
  }

}

export default withStore(ChatUsersList)(
  store => ({
    usersList: store.getState().usersList
  }),
);
