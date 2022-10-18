import {Component} from "../../core";

import "../profile/profile.css";
import {CurrentProfilePage} from "../profile/profile";

export class ProfileChangeData extends Component{
  constructor() {
    super({
      currentPage: CurrentProfilePage.CHANGE_DATA,
      fields: [
        {
          label: "Почта",
          name: "email",
          value: "pochta@yandex.ru",
          ref: "emailRef",
          modification: ["filled"],
          inputProps: {
            className: "text-field-profile__input"
          },
          labelProps: {
            className: "text-field-profile__label"
          },
        },
        {
          label: "Логин",
          name: "login",
          value: "ivanivanov",
          ref: "loginRef",
          modification: ["filled"],
          inputProps: {
            className: "text-field-profile__input"
          },
          labelProps: {
            className: "text-field-profile__label"
          },
        },
        {
          label: "Имя",
          value: "Иван",
          name: "firstName",
          ref: "firstNameRef",
          modification: ["filled"],
          inputProps: {
            className: "text-field-profile__input"
          },
          labelProps: {
            className: "text-field-profile__label"
          },
        },
        {
          label: "Фамилия",
          value: "Иванов",
          name: "lastName",
          ref: "lastNameRef",
          modification: ["filled"],
          inputProps: {
            className: "text-field-profile__input"
          },
          labelProps: {
            className: "text-field-profile__label"
          },
        },
        {
          label: "Имя в чате",
          value: "Иван",
          name: "nameInChat",
          ref: "nameInChatRef",
          modification: ["filled"],
          inputProps: {
            className: "text-field-profile__input"
          },
          labelProps: {
            className: "text-field-profile__label"
          },
        },
        {
          label: "Телефон",
          value: "+79099673030",
          name: "phone",
          ref: "phoneRef",
          inputProps: {
            className: "text-field-profile__input"
          },
          labelProps: {
            className: "text-field-profile__label"
          },
        },
      ],
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();
        const allRefs = Object.keys(this.refs);
        const errors = allRefs
          .map(key => this.refs[key].getRefs().errorRef.getProps().message)
          .filter(Boolean);
        if (errors.length) {
          return;
        }
        const body = allRefs.map(key => ({
          [this.refs[key].getProps().name]: this.refs[key].getProps().value
        }))
        console.log(body);
        window.location.replace('/profile.html');
      },
      onGoToChat: (event: MouseEvent) => {
        event.preventDefault();
        window.location.replace("/chat.html")
      }
    });
  }

  protected render(): string {
    return `
    <div class="wrapper wrapper_profile">
      <div class="back-to-chats-content">
            {{#FabButton modification="fab-button_exit fab-button_small fab-button_white-icon" onClick=onGoToChat}}
                {{{SvgIcon type="arrow-right"}}}
            {{/FabButton}}
      </div>
      <div class="main-content">
        <div class="content">
          {{{ Avatar profileMode=true }}}
          {{#ProfileForm 
              onSubmit=onSubmit
              currentPage=currentPage
          }}
            {{#each fields}}
              {{{ControlledTextField 
                name=this.name 
                type=this.type 
                label=this.label 
                value=this.value
                ref=this.ref
                className="text-field-profile"
                modifications=this.modification
                inputProps=this.inputProps
                labelProps=this.labelProps
              }}}
            {{/each}}
          {{/ProfileForm}}
        </div>
      </div>
    </div>
    `
  }
}