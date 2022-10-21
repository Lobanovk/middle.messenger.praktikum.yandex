import { Component } from "core";
import ControlledTextField, { ControlledTextFieldIncomingProps } from "../../components_v1/inputs/controlled-text-field";
import { Fields, FieldsPassword, Links } from "./fields";
import { validation, ValidationKeys } from "../../helpers/validation";

export enum PageType {
  DEFAULT = "DEFAULT",
  CHANGE_PASSWORD =  "CHANGE_PASSWORD",
  CHANGE_DATA = "CHANGE_DATA",
}

export type TextFieldProps = (Partial<ControlledTextFieldIncomingProps> & { ref: string })

type IncomingProps = {
  type: PageType,
}

type Props = IncomingProps & {
  onClickAvatar: () => void;
  onCloseModal: () => void;
  onSubmit: (event: SubmitEvent) => void;
  links?: Record<string, string>[];
  fields?: TextFieldProps[];
  isVisibleModal: boolean;
}

type KeysRefs =
  "emailRef" |
  "loginRef" |
  "firstNameRef" |
  "lastNameRef" |
  "nameInChatRef" |
  "phoneRef" |
  "oldPasswordRef" |
  "passwordRef" |
  "repeatPasswordRef";

type Refs = Record<KeysRefs, ControlledTextField>;

const getFields = (type: PageType, onBlur?: TextFieldProps["onBlur"]): TextFieldProps[] => {
  if (type === PageType.CHANGE_PASSWORD) {
    const lastInput = FieldsPassword.pop();
    return [
      ...FieldsPassword,
      {
        ...lastInput,
        onBlur,
      } as TextFieldProps
    ];
  }
  return Fields;
};

export class Profile extends Component<Props, Refs> {
  constructor(props: IncomingProps) {
    const onBlur = (_event: FocusEvent, el: HTMLInputElement, component: ControlledTextField) => {
      const error = validation(el.name as ValidationKeys, this.refs.passwordRef.getProps().value || "", el.value);
      component.setProps({
        value: el.value
      });
      component.getRefs().errorRef.setProps({
        message: error
      });
    };
    super({
      ...props,
      isVisibleModal: false,
      links: Links,
      fields: getFields(props.type, onBlur as TextFieldProps["onBlur"]),
      onClickAvatar: () => this.setProps({ isVisibleModal: true }),
      onSubmit: event => {
        event.preventDefault();
        const errors = Object.values(this.refs)
          .map(ref => ref.getRefs().errorRef.getProps().message)
          .filter(Boolean);
        if (errors.length) return;

        const body = Object.values(this.refs)
          .map(ref => ({ [ref.getProps().name as string]: ref.getProps().value }));
        console.log(body);
        console.log("go to back");
      },
      onCloseModal: () => this.setProps({ isVisibleModal: false }),
    });
  }

  protected renderContentDefault(): string {
    return `
      {{#Avatar profileMode=true changeAvatarAction=true onClick=onClickAvatar }}
        {{{BigAvatarIcon className="avatar-icon" }}}
      {{/Avatar}}
      <h3 class="name">name</h3>
      <div class="text-fields-wrapper">
        <div class="profile-information">
          {{#each fields}}
            {{{Text 
              label=this.label 
              value=this.value 
              ref=this.ref
            }}}
          {{/each}}
        </div>
        {{{ProfileFormActions type="links" links=links }}}
      </div>
    `;
  }

  protected renderContentChangeFields(): string {
    return `
      {{#Avatar profileMode=true }}
        {{{BigAvatarIcon className="avatar-icon" }}}
      {{/Avatar}}
      {{#Form className="text-fields-wrapper" onSubmit=onSubmit}}
        <div class="profile-information">
           {{#each fields}}
              {{{ControlledTextField 
                name=this.name 
                type=this.type 
                label=this.label 
                value=this.value
                ref=this.ref
                onFocus=this.onFocus
                onBlur=this.onBlur
                className="text-field-profile"
                modification=this.modification
                inputClassName=this.inputClassName
                labelClassName=this.labelClassName
              }}}
           {{/each}}
        </div>
        {{{ProfileFormActions type="button"}}}
      {{/Form}}
    `;
  }

  getRenderContent(): string {
    switch (this.props.type) {
    case PageType.CHANGE_DATA:
    case PageType.CHANGE_PASSWORD:
      return this.renderContentChangeFields();
    default:
      return this.renderContentDefault();
    }
  }

  protected render(): string {
    const content = this.getRenderContent();
    return `
      {{#Wrapper type="profile"}}
        {{{BackToChats }}}
        {{#ChatWrapper className="chat-wrapper_center-content"}}
          <div class="content">
            ${content}
          </div>
        {{/ChatWrapper}}
        {{#if isVisibleModal}}
            {{{ProfileModal onClose=onCloseModal}}}
        {{/if}}
      {{/Wrapper}}
    `;
  }

}
