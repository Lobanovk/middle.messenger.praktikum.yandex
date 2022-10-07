import {Component} from "../../core";
import {ModalFormProps} from "../modal-form/modal-form";

import "./modal.css"

interface ModalProps extends ModalFormProps{
  onSubmit: () => void;
}

export class Modal extends Component{
  constructor(props: ModalProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="modal">
        {{{ModalForm ref="modalFormRef" title=title buttonText=buttonText onSubmit=onSubmit }}}
      </div>
    `
  }
}