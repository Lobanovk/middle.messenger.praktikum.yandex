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
      onClickAvatar: () => {
        this.setProps({
          isVisibleModal: true
        })
      },
      currentPage: CurrentProfilePage.DEFAULT,
      fields: [
        {
          label: "Почта",
          value: "pochta@yandex.ru",
        },
        {
          label: "Логин",
          value: "ivanivanov",
        },
        {
          label: "Имя",
          value: "Иван",
        },
        {
          label: "Фамилия",
          value: "Иванов",
        },
        {
          label: "Имя в чате",
          value: "Иван",
          ref: "nameInChatRef"
        },
        {
          label: "Телефон",
          value: "+7 (909) 967 30 30",
        },
      ],
      isVisibleModal: false,
      name: "",
      fileUpload: null,
      onUploadFile: (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          this.setProps({
            fileUpload: file
          })
        }
      },
      onSendFile: (event: SubmitEvent) => {
        event.preventDefault();
        if (!this.props.fileUpload) {
          this.refs.modalRef.getRefs().modalFormRef.getRefs().errorRef.setProps({
            message: "Нужно выбрать файл"
          })
          return;
        }
        console.log(this.props.fileUpload);
        this.setProps({
          isVisibleModal: false,
          fileUpload: null,
        })
      }
    });
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

  protected render(): string {
    console.log(this.props);
    return `
      <div class="wrapper wrapper_profile">
        <div class="back-to-chats-content">
            but
        </div>
        <div class="main-content">
            <div class="content">
              {{{ Avatar profileMode=true changeAvatarAction=true onClick=onClickAvatar }}}
              <h3 class="name">{{ name }}</h3>
              {{#ProfileForm 
                  onSubmit=onSubmit
                  onGoToSettingsPage=onGoToSettingsPage
                  currentPage=currentPage
              }}
                {{#each fields}}
                  {{{Text 
                    label=this.label 
                    value=this.value 
                    ref=this.ref
                  }}}
                {{/each}}
              {{/ProfileForm}}
            </div>
          </div>
          {{#if isVisibleModal}}
            {{# Modal 
                title="Загрузите файл" 
                buttonText="Поменять" 
                ref="modalRef"
                onSubmit=onSendFile
            }}
              {{#if fileUpload}}
                  <div class="upload-file">
                      ${this.props.fileUpload?.name}
                  </div
              {{else}}
                  {{{ InputDownload 
                      name="file-download" 
                      label="Выбрать файл на компьютере"
                      onChange=onUploadFile
                  }}}
              {{/if}}
            {{/Modal}}
          {{/if}}
      </div>
    `
  }
}