import {Component} from "../../core";
import {CurrentProfilePage} from "../../pages/profile/profile";

import './profile-form.css';

interface ProfileFormProps {
  onSubmit: () => void;
  currentPage: CurrentProfilePage;
  onGoToSettingsPage: () => void;
}

export class ProfileForm extends Component{
  constructor({ onSubmit, currentPage, onGoToSettingsPage }: ProfileFormProps) {
    super({
      actions: [
        {
          href: "#",
          text: "Изменить данные",
          modification:" actions__link_custom",
          to: CurrentProfilePage.CHANGE_DATA,
          onClick: onGoToSettingsPage,
        },
        {
          href: "#",
          text: "Изменить пароль",
          modification:" actions__link_custom",
          to: CurrentProfilePage.CHANGE_PASSWORD,
          onClick: onGoToSettingsPage,
        },
        {
          href: "#",
          text: "Выйти",
          modification: "link_attention actions__link_custom",
          to: CurrentProfilePage.EXIT,
          onClick: onGoToSettingsPage,
        }
      ],
      currentPage,
      events: {
        submit: onSubmit
      }
    });
  }

  protected render(): string {
    return `
      <form class="form">
        <div class="profile-information" data-layout="1">
        </div>
        {{{ProfileActions 
            actions=actions
            currentPage=currentPage
        }}}
      </form>
    `
  }
}