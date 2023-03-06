import { ChatRequestData } from "../../api/chats";
import { Dispatch } from "../../core/Store";
import TextField from "../inputs/text-field";
import { Component } from "../../core";
import { withStore } from "../../helpers/withStore";
import { createChat } from "../../services/chats";
import { ControlledTextFieldProps } from "../inputs/controlled-text-field";
import { replaceTags } from "../../helpers/validation";

type IncomingProps = {
  createChat: (title: ChatRequestData["title"]) => Dispatch<AppState>;
  onClose: () => void;
}

type Props = Omit<IncomingProps, "onClose"> & {
  onSubmit: (event: SubmitEvent) => void;
  onClick: (event: MouseEvent) => void;
  onBlur: (      _event: FocusEvent,
    el: HTMLInputElement,
    component: Component<ControlledTextFieldProps>) => void;
  onEmpty: () => void;
};

type Refs = {
  titleRef: TextField;
}

class ChatModal extends Component<Props, Refs> {
  static componentName = "ChatModal";

  constructor({onClose, ...props}: IncomingProps) {
    super({
      ...props,
      onSubmit: event => {
        event.preventDefault();
        const title = this.refs.titleRef.getProps().value || "";
        this.props.createChat(title);
        onClose();
      },
      onClick: (event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      },
      onEmpty: () => {},
      onBlur: (
        _event: FocusEvent,
        el: HTMLInputElement,
        component: Component<ControlledTextFieldProps>
      ) => {
        component.setProps({
          value: replaceTags(el.value) as string
        });
      }
    });
  }

  protected render(): string {
    return `
      {{#Modal onClick=onClick}}
        {{#Form className="pane" onSubmit=onSubmit}}
        <h4 class="pane__title">Введите название чата</h4>
        <div class="pane__content">
            {{{ControlledTextField 
              name="login" 
              type="text" 
              label="Название чата" 
              ref="titleRef"
              onBlur=onBlur
              onFocus=onEmpty
              modification="filled"
              inputClassName="text-field-login__input"
            }}}
        </div>
        {{{Button text="Создать" }}}
        {{/Form}}
      {{/Modal}}
    `;
  }
}

export default withStore(ChatModal)(
  () => ({}),
  store => ({
    createChat: (title: ChatRequestData["title"]) => store.dispatch(createChat, { title })
  })
);
