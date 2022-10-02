import {Component} from "../../core";

interface FormProps {
  layoutId: string;
  onSubmit: () => void;
  modification: string;
  title: string;
  buttonProps: { text: string };
  linkProps: {
    href: string;
    text: string;
  }
}

import './login-form.css';

export class LoginForm extends Component {
  static componentName = "LoginForm";

  constructor({onSubmit, layoutId, ...props }: FormProps) {
    super({ ...props, layoutId, events: { submit: onSubmit } });
  }

  protected render(): string {
    return `
      <form class="card card_{{ modification }}">
          <div class="content">
            <h3 class="title">{{ title }}</h3>
            <div class="inputs_container inputs_container_{{ modification }}" data-layout="1">
            </div>
          </div>
          <div class="actions-login">
            {{{ Button text=buttonProps.text }}}
            {{{ Link text=linkProps.text href=linkProps.href }}}
          </div>
      </form>
    `
  }
}