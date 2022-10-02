import {Component} from "../../core";
import {CurrentProfilePage} from "../../pages/profile/profile";

import "./profile-actions.css"

interface ProfileActionsProps {
  actions: Record<string, any>[];
  currentPage: string;
}

export class ProfileActions extends Component{
  constructor(props: ProfileActionsProps) {
    super(props);
  }

  defaultRender(): string {
    return `
        {{#each actions}}
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
    `
  }

  changeData(): string {
    return `{{{Button text="Сохранить"}}}`
  }

  protected render(): string {
    let content: string;
    switch (this.props.currentPage) {
      case CurrentProfilePage.DEFAULT:
        content = this.defaultRender();
        break;
      case CurrentProfilePage.CHANGE_PASSWORD:
      case CurrentProfilePage.CHANGE_DATA:
        content = this.changeData();
        break;
      default:
        content = this.defaultRender();
    }
    const className =
      [CurrentProfilePage.CHANGE_DATA, CurrentProfilePage.CHANGE_PASSWORD].includes(this.props.currentPage)
        ? `profile-actions_change ${CurrentProfilePage.CHANGE_DATA === this.props.currentPage ? 'profile-actions_change-data' : 'profile-actions_change-password'}`
        : ''
    return `
     <div class="profile-actions ${className}">
      ${content}
     </div>
    `
  }
}