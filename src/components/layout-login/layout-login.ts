import {Component} from "../../core";

import './layout-login.css'

interface LayoutLoginFormProps {
  title: string;
  modification: string;
  onSubmit?: () => void;
  buttonProps: { [key: string]: string }
  linkProps: { [key: string]: string }
}

export class LayoutLogin extends Component<LayoutLoginFormProps>{
  static componentName = "LayoutLoginForm";

  constructor(props: LayoutLoginFormProps) {
    super(props);
  }

  protected render(): string {
    return `
    <div class="wrapper wrapper_login">
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