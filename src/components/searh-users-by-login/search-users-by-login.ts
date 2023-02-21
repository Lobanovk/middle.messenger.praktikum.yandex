import { Component } from "../../core";
import { ControlledTextFieldProps } from "../inputs/controlled-text-field";
import { Store } from "../../core/Store";
import TextField from "../inputs/text-field";
import { withStore } from "../../helpers/withStore";
import { getUsersList } from "../../services/user";
import { replaceTags } from "../../helpers/validation";

type IncomingProps = {
  getUsersList: (login: string) => Store<AppState>["dispatch"];
}

type Props = {
  onSubmit: (event: SubmitEvent) => void;
  onBlur: (      _event: FocusEvent,
    el: HTMLInputElement,
    component: Component<ControlledTextFieldProps>) => void;
  onEmpty: () => void;
} & IncomingProps

type Refs = {
  loginRef: TextField
}
class SearchUsersByLogin extends Component<Props, Refs> {
  static componentName = "SearchUsersByLogin";

  constructor(props: IncomingProps) {
    super({
      ...props,
      onSubmit: event => {
        event.preventDefault();
        const login = this.refs.loginRef.getProps().value || "";
        this.props.getUsersList(login);
      },
      onEmpty: () => {},
      onBlur: (
        _event: FocusEvent,
        el: HTMLInputElement,
        component: Component<ControlledTextFieldProps>
      ) => {
        component.setProps({
          value: replaceTags(el.value)
        });
      }
    });
  }
  protected render(): string {
    return `
      {{#Form className="search-users-by-login" onSubmit=onSubmit}}
        {{{ControlledTextField 
          name="login" 
          type="text" 
          label="Логин"
          ref="loginRef"
          onBlur=onBlur
          onFocus=onEmpty
          modification="filled"
          inputClassName="text-field-login__input search-users-by-login__input"
        }}}
        {{{Button text="Найти" className="search-users-by-login__button"}}}
        {{{ UsersList }}}
      {{/Form}}
    `;
  }
}

export default withStore(SearchUsersByLogin)(
  () => ({}),
  store => ({
    getUsersList: (login: string) => store.dispatch(getUsersList, { login })
  })
);
