import {Component} from "../../core";

import "./modal-form.css"

export interface ModalFormProps {
  title: string;
  buttonText: string;
  onSubmit: () => void;
}

export class ModalForm extends Component {
  constructor({onSubmit, ...props}: ModalFormProps) {
    super({...props, events: { submit: onSubmit }});
  }

  protected render(): string {
    return `
      <form class="pane">
        <h4 class="pane__title">{{ title }}</h4>
        <div class="pane__content" data-layout="1"></div>
        {{{ Button text=buttonText }}}
      </form>
    `
  }
}