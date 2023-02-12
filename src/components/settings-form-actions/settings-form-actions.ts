import { Component } from "core";

type IncomingProps = {
  type: "links" | "button";
  links?: Record<string, any>[];
  className?: string;
}
// todo прервать перезагрузку по линкам, так как не соответвествует правильной работе
export class SettingsFormActions extends Component<IncomingProps> {
  static componentName = "SettingsFormActions";

  constructor(props: IncomingProps) {
    super(props);
  }

  getClassName() {
    return this.props.type === "button" ?
      `profile-actions_change ${this.props.className}` :
      "";
  }

  renderLinks() {
    return `
      {{#each links}}
        <div class="profile-actions__link">
          {{{Link 
            href=this.href 
            modification=this.modification 
            text=this.text
            onClick=this.onClick
            to=this.to
          }}}
        </div>
      {{/each}}
    `;
  }

  renderButton(): string {
    return "{{{Button text=\"Сохранить\"}}}";
  }

  protected render(): string {
    const className = this.getClassName();
    const content = this.props.type === "links" ?
      this.renderLinks() :
      this.renderButton();

    return `
      <div class="profile-actions ${className}">
        ${content}
      </div>
    `;
  }
}
