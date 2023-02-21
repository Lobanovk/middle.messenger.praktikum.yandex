import { Component } from "../../core";

type IncomingProps = {
  onClose: () => void;
}

type Props = Omit<IncomingProps, "onClose"> & {
  onClick: (event: MouseEvent) => void;
}
class RemoveUserModal extends Component<Props> {
  static componentName = "RemoveUserModal";

  constructor({onClose, ...props}: IncomingProps) {
    super({
      ...props,
      onClick: (event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      },
    });
  }

  protected render(): string {
    return `
      {{#Modal onClick=onClick}}
        <div class="pane">
          <h4 class="pane__title">Удалить пользователя</h4>
          {{{ChatUsersList }}}
          {{{AddUserById type="remove" text="Удалить" onClose=onClose }}}
        </div>
      {{/Modal}}
    `;
  }
}

export default RemoveUserModal;
