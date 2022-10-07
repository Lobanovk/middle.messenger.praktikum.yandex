import {Component} from "../../core";

export class ErrorPage500 extends Component{
  constructor() {
    super({
      title: "500",
      description: "Мы уже фиксим",
      linkProps: {
        text: "Назад к чатам",
        href: "/chat.html"
      }
    });
  }

  protected render(): string {
    return `
      <div class="wrapper wrapper_error wrapper_error-404">
        {{{CardError
            title=title
            description=description
            linkProps=linkProps
        }}}
      </div>
    `
  }
}