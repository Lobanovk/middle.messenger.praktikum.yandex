import {Component} from "../../core";

import "./profile.css";

export enum CurrentProfilePage {
  DEFAULT = 'defaultPage',
  CHANGE_DATA = 'change-data',
  CHANGE_PASSWORD = 'change-password',
  EXIT = "exit"
}

export class Profile extends Component {
  constructor() {
    super({
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();
        console.log(this.refs);
        this.setProps({
          currentPage: CurrentProfilePage.DEFAULT
        })
      },
      onGoToSettingsPage: (event: MouseEvent) => {
        event.preventDefault();
        const { to } = (event.target as HTMLElement).dataset;
        this.setProps({
          currentPage: to,
          isVisibleName: CurrentProfilePage.DEFAULT === to,
        })
      },
      onClickAvatar: () => {
        this.setProps({
          isVisibleModal: true
        })
      },
      onClose: () => {
        this.setProps({
          isVisibleModal: false
        })
      },
      currentPage: CurrentProfilePage.DEFAULT,

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
          value: "+7 (909) 967 30 30",
          ref: "phoneRef",
          inputProps: {
            className: "text-field-profile__input"
          },
          labelProps: {
            className: "text-field-profile__label"
          },
        },
      ],
      passwordFields: [
        {
          label: "Старый пароль",
          name: "old-password",
          value: "1234",
          type: "password",
          ref: "oldPasswordRef",
          modification: ["filled"],
          inputProps: {
            className: "text-field-profile__input"
          },
          labelProps: {
            className: "text-field-profile__label"
          },
        },
        {
          label: "Новый пароль",
          name: "new-password",
          value: "123456",
          type: "password",
          ref: "newPasswordRef",
          modification: ["filled"],
          inputProps: {
            className: "text-field-profile__input"
          },
          labelProps: {
            className: "text-field-profile__label"
          },
        },
        {
          label: "Повторите новый пароль",
          name: "repeat-new-password",
          value: "1234",
          type: "password",
          ref: "repeatNewPasswordRef",
          inputProps: {
            className: "text-field-profile__input"
          },
          labelProps: {
            className: "text-field-profile__label"
          },
        },
      ],
      isVisibleName: true,
      isVisibleModal: false,
      name: "",
    });
  }

  renderText() {
    return `
      {{#each fields}}
        {{{Text 
          label=this.label 
          value=this.value 
          ref=this.ref
        }}}
      {{/each}}
    `
  }

  renderChangeData() {
    return `
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
    `
  }

  renderChangePassword() {
    return `
      {{#each passwordFields}}
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
    `
  }

  componentDidMount(props: any) {
    this.setProps({
      name: this.refs.nameInChatRef.props.value
    })
  }

  getContentByPage(): string {
    switch (this.props.currentPage) {
      case CurrentProfilePage.CHANGE_DATA:
        return this.renderChangeData();
      case CurrentProfilePage.CHANGE_PASSWORD:
        return this.renderChangePassword();
      default:
        return this.renderText()
    }
  }

  protected render(): string {
    console.log(this.props);
    let content = this.getContentByPage();
    return `
      <div class="wrapper wrapper_profile">
        <div class="back-to-chats-content">
            but
        </div>
        <div class="main-content">
            <div class="content">
              {{{ Avatar profileMode=true changeAvatarAction=true onClick=onClickAvatar }}}
              {{#if isVisibleName}}<h3 class="name">{{ name }}</h3>{{/if}}
              {{#ProfileForm 
                  onSubmit=onSubmit
                  onGoToSettingsPage=onGoToSettingsPage
                  currentPage=currentPage
              }}
                ${content}
              {{/ProfileForm}}
            </div>
          </div>
          {{#if isVisibleModal}}
            {{{ Modal title="13324" buttonText="4321" onClose=onClose }}}
          {{/if}}
      </div>
    `
  }
}