import {Component} from "../../core";
import {ModalFormProps} from "../modal-form/modal-form";

import "./modal.css"

interface ModalProps extends ModalFormProps{
  onClose: () => void;
}

export class Modal extends Component{
  constructor({onClose, ...props}: ModalProps) {
    super({...props, onSubmit: (event: SubmitEvent) => {
        console.log('bitch');
        event.preventDefault();
        onClose();
      }});
  }

  protected render(): string {
    console.log(this.props);
    return `
      <div class="modal">
        {{#ModalForm title=title buttonText=buttonText onSubmit=onSubmit }}
            <div>134</div>
        {{/ModalForm}}
      </div>
    `
  }
}