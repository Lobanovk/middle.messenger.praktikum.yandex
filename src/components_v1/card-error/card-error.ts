import { Component } from "core";

type IncomingProps = {
  title: string;
  description: string;
  link: {
    text: string;
    href: string;
  }
}

export class CardError extends Component<IncomingProps>{
  static componentName = "CardError";

  constructor(props: IncomingProps) {
    super(props);
  }

  protected render(): string {
    return `
    <div class="card-error">
      <div class="card-error__content">
          <h1 class="title">
              {{ title }}
          </h1>
          <p class="description">
              {{ description }}
          </p>
      </div>
      <div class="card-error__footer">
          {{{Link href=link.href text=link.text}}}
      </div>
    </div>
    `;
  }
}
