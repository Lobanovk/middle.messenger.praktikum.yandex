import {Component} from "../../core";
import chatsData from "../../data/chats.json";
import personData from "../../data/person.json";

export class Chat extends Component{
  constructor() {
    const onSelectChat = (event: MouseEvent, component: Component) => {
      this.setProps({
        person: personData,
        isSelectedIndexChat: component.getProps().id,
      })
    }
    super({
      chats: chatsData.map((chat: Record<string, any>, index: number) => ({...chat, onClick: onSelectChat, id: index})),
      person: null,
      isSelectedIndexChat: null,
      profileLinkProps: {
        href: "./profile.html",
        text: "Профиль",
        modification: "link_profile"
      },
      searchInputProps: {
        ref: "searchInputRef",
        onBlur: () => {},
        placeholder: "Поиск",
        modifications: ["outlined"],
        inputProps: {
          className: "chats-list__input-search"
        }
      },
    });
  }

  renderEmpty(): string {
    return ` <p class="chat__empty">Выберите чат чтобы отправить сообщение</p> `
  }

  renderChatContent(): string {
    return `
      {{{ChatContent
        personName=person.personName
        messages=person.messages
      }}}
    `
  }

  protected render(): string {
    const content = this.props.person ? this.renderChatContent() : this.renderEmpty();
    return `
      <div class="wrapper wrapper_chat">
          <div class="chats-list">
              <div class="chats-list__header">
                  <div class="chats-list__link">
                    {{{Link
                        text=profileLinkProps.text
                        href=profileLinkProps.href
                        modification=profileLinkProps.modification
                    }}}
                  </div>
                  <div class="chats-list__input-container">
                      {{{TextField
                          ref=searchInputProps.ref
                          placeholder=searchInputProps.placeholder
                          inputProps=searchInputProps.inputProps
                          modifications=searchInputProps.modifications
                          value=""
                      }}}
                  </div>
              </div>
              <div class="chats-list__content">
                {{#each chats}}
                    {{{MiniChat
                        selectedId=${this.props.isSelectedIndexChat}
                        id=this.id
                        name=this.name
                        time=this.time
                        lastMessageIsYour=this.lastMessageIsYour
                        messageCount=this.messageCount
                        previewMessage=this.previewMessage
                        onClick=this.onClick
                    }}}
                {{/each}}
              </div>
          </div>
          <div class="chat">
              ${content}
          </div>
      </div>
    `
  }
}
