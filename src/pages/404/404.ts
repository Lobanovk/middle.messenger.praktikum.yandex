import {Component} from "../../core";

export class ErrorPage404 extends Component{
  constructor() {
    super({
      title: "404",
      description: "Не туда попали",
      linkProps: {
        text: "Назад к чатам",
        href: "/chat.html"
      }
    });
  }

  protected render(): string {
    return `
      <div class="wrapper wrapper__error wrapper__error-404">
        {{{CardError
            title=title
            description=description
            linkProps=linkProps
        }}}
      </div>
    `
  }
}