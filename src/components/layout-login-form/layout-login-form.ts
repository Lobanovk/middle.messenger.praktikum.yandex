import {Component} from "../../core";

import './layout-login-form.css'

interface LayoutLoginFormProps {
  title: string;
  modification: string;
  onSubmit?: () => void;
  buttonProps: { [key: string]: string }
  linkProps: { [key: string]: string }
}

export class LayoutLoginForm extends Component<LayoutLoginFormProps>{
  static componentName = "LayoutLoginForm";

  constructor(props: LayoutLoginFormProps) {
    super(props);
  }

  protected render(): string {
    return `
    <div class="wrapper">
        {{{LoginForm
              title=title
              onSubmit=onSubmit 
              modification=modification 
              buttonProps=buttonProps
              linkProps=linkProps
              layoutId="form-layout"
        }}}
    </div>
    `
  }
}