import { Component } from "../../core";;

type IncomingProps = {
  onClose: () => void;
}

type Props = Omit<IncomingProps, "onClose"> & {
  onClick: (event: MouseEvent) => void;
}
class AddUserModal extends Component<Props> {
  static componentName = "AddUserModal";

  constructor({onClose, ...props}: IncomingProps) {
    super({
      ...props,
      onClick: (event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }
    });
  }

  protected render(): string {
    return `
      {{#Modal onClick=onClick}}
        <div class="pane">
          <h4 class="pane__title">Добавить пользователя</h4>
          {{{SearchUsersByLogin }}}
          {{{AddUserById onClose=onClose }}}
        </div>
      {{/Modal}}
    `;
  }
}

export default AddUserModal;
