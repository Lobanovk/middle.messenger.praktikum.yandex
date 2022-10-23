import { Component } from "core";

type IncomingProps = {
  profileMode?: boolean;
  changeAvatarAction?: boolean;
  onClick: () => void;
}

type Props = Omit<IncomingProps, "onClick"> & {
  events: {
    click: IncomingProps["onClick"];
  }
}

export class Avatar extends Component<Props> {
  static componentName = "Avatar";

  constructor({onClick, ...props}: IncomingProps) {
    super({ ...props, events: { click: onClick } });
  }

  protected render(): string {
    return `
      <div class="avatar {{#if profileMode}}avatar_big{{/if}}">
          {{#if profileMode}}
            <div data-slot="1"></div>
          {{/if}}
          {{#if changeAvatarAction}} <div class="avatar__change">Поменять аватар</div> {{/if}}
      </div>
    `;
  }
}
