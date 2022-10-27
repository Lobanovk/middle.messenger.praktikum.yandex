import { Component } from "core";
import ControlledTextField, {
  ControlledTextFieldIncomingProps
} from "../../components/inputs/controlled-text-field";
import { Fields, FieldsPassword, Links } from "./fields";
import { validation, ValidationKeys } from "../../helpers/validation";
import { withStore } from "../../helpers/withStore";
import { Store } from "../../core/Store";
import { changeUserPassword, changeUserProfile } from "../../services/user";
import { Screens } from "../../helpers/screenList";
import { UserPasswordRequestData } from "../../api/users";

export enum PageType {
  DEFAULT = "DEFAULT",
  CHANGE_PASSWORD =  "CHANGE_PASSWORD",
  CHANGE_DATA = "CHANGE_DATA",
}

export type TextFieldProps = (Partial<ControlledTextFieldIncomingProps> & { ref: string })

type IncomingProps = {
  type: PageType,
  store: Store<AppState>,
}

type Props = IncomingProps & {
  onClickAvatar: () => void;
  onCloseModal: () => void;
  onSubmit: (event: SubmitEvent) => void;
  links?: Record<string, string>[];
  fields?: TextFieldProps[];
  isVisibleModal: boolean;
  name: string;
}

type KeysRefs =
  "emailRef" |
  "loginRef" |
  "secondNameRef" |
  "lastNameRef" |
  "displayNameRef" |
  "phoneRef" |
  "oldPasswordRef" |
  "passwordRef" |
  "newPasswordRef";

type Refs = Record<KeysRefs, ControlledTextField>;

const getFields = (type: PageType, user: User | null, onBlur?: TextFieldProps["onBlur"]): TextFieldProps[] => {
  let fields = Fields;
  if (type === PageType.CHANGE_PASSWORD) {
    const lastInput = FieldsPassword.pop();
    fields = [
      ...FieldsPassword,
      {
        ...lastInput,
        onBlur,
      } as TextFieldProps
    ];
  }
  return fields.map(field => {
    const body = { ...field };
    if (user && body.name) {
      if (user[body.name as keyof User]) {
        body.value = String(user[body.name as keyof User]);
      }
    }
    return body;
  });
};

export class Settings extends Component<Props, Refs> {
  static componentName = "Settings";

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
      fields: getFields(props.type, props.store.getState().user, onBlur as TextFieldProps["onBlur"]),
      onClickAvatar: () => this.setProps({ isVisibleModal: true }),
      onSubmit: event => {
        event.preventDefault();
        const errors = Object.values(this.refs)
          .map(ref => ref.getRefs().errorRef.getProps().message)
          .filter(Boolean);
        if (errors.length) return;
        const body = Object.values(this.refs)
          .reduce((acc, ref) => ({ ...acc, [ref.getProps().name as string]: ref.getProps().value }), {});
        if (this.props.store.getState().screen === Screens.SettingsChangePassword) {
          changeUserPassword(body as UserPasswordRequestData);
        } else {
          this.props.store.dispatch(changeUserProfile, body);
        }
      },
      onCloseModal: () => this.setProps({ isVisibleModal: false }),
      name: props.store.getState().user?.displayName || "",
    });
  }

  protected renderContentDefault(): string {
    return `
      {{#Avatar profileMode=true changeAvatarAction=true onClick=onClickAvatar }}
        {{{BigAvatarIcon className="avatar-icon" }}}
      {{/Avatar}}
      <h3 class="name">{{name}}</h3>
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
        {{{SettingsFormActions type="links" links=links }}}
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
        {{{SettingsFormActions type="button"}}}
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
            {{{SettingsModal onClose=onCloseModal}}}
        {{/if}}
      {{/Wrapper}}
    `;
  }
}

export default withStore(Settings);
