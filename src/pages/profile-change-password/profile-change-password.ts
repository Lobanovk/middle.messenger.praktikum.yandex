import {Component} from "../../core";
import {CurrentProfilePage} from "../profile/profile";
import {validation, ValidationKeys} from "../../helpers/validation";

export class ProfileChangePassword extends Component{
  constructor() {
    super({
      currentPage: CurrentProfilePage.CHANGE_PASSWORD,
      fields: [
        {
          label: "Старый пароль",
          name: "oldPassword",
          value: "A1qwerty",
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
          name: "password",
          value: "A1qwerty",
          type: "password",
          ref: "passwordRef",
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
          name: "repeatPassword",
          value: "A1qwerty",
          type: "password",
          ref: "repeatPasswordRef",
          inputProps: {
            className: "text-field-profile__input"
          },
          labelProps: {
            className: "text-field-profile__label"
          },
          onFocus: () => {},
          onBlur: (event: FocusEvent, el: HTMLInputElement, component: Component) => {
            console.log(this.refs);
            const error = validation(el.name as ValidationKeys, this.refs.passwordRef.getProps().value, el.value);
            component.setProps({
              value: el.value
            });
            component.refs.errorRef.setProps({
              message: error
            })
          }
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
                  onGoToSettingsPage=onGoToSettingsPage
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
                    onBlur=this.onBlur
                    onFocus=this.onFocus
                  }}}
                {{/each}}
              {{/ProfileForm}}
            </div>
        </div>
      </div>
    `
  }
}