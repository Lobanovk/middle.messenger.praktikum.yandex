import {Component} from "../../core";
import {CurrentProfilePage} from "../../pages/profile/profile";

import './profile-form.css';

interface ProfileFormProps {
  onSubmit: () => void;
  currentPage: CurrentProfilePage;
  onGoToSettingsPage: () => void;
}

export class ProfileForm extends Component{
  constructor({ onSubmit, currentPage }: ProfileFormProps) {
    super({
      actions: [
        {
          href: "/profile-change-data.html",
          text: "Изменить данные",
          modification:" actions__link_custom",
        },
        {
          href: "/profile-change-password.html",
          text: "Изменить пароль",
          modification:" actions__link_custom",
        },
        {
          href: "./",
          text: "Выйти",
          modification: "link_attention actions__link_custom",
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