import { Component } from "core";
import { validation, ValidationKeys } from "../../../helpers/validation";
import { TextFieldProps } from "../text-field";
import ErrorComponent from "../../error-component";

export type IncomingProps = {
  onFocus?: (event: FocusEvent, el: HTMLInputElement, component?: Component<Props>) => void;
  onBlur?: (event: FocusEvent, el: HTMLInputElement, component?: Component<Props>) => void;
} & TextFieldProps;

export type Props = Partial<
  Omit<IncomingProps, "onFocus" | "onBlur"> & {
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  ref: "errorRef"
}>

type Refs = {
  errorRef: ErrorComponent
}

export class ControlledTextField extends Component<Props, Refs> {
  static componentName = "ControlledTextField";
  private firstFocusOnEl = false;

  constructor(props: IncomingProps) {
    super({
      ...props,
      onFocus: (event) => {
        const el = event.target as HTMLInputElement;
        if (props.onFocus) {
          props.onFocus(event, el, this);
          return;
        }
        if (this.firstFocusOnEl) {
          this.valid(el);
        }
        this.firstFocusOnEl = true;
      },
      onBlur: event => {
        const el = event.target as HTMLInputElement;
        if (props.onBlur) {
          props.onBlur(event, el, this);
          return;
        }
        this.setProps({ value: el.value });
        this.valid(el);
      },
      ref: "errorRef"
    });
  }

  private valid(el: HTMLInputElement) {
    const names = ["firstName", "lastName", "nameInChat"];
    const password = ["password", "oldPassword"];
    let type = el.name;
    if (names.includes(type)) {
      type = "names";
    }
    if (password.includes(type)) {
      type = "password";
    }
    const error = validation((type as ValidationKeys), el.value);
    this.refs.errorRef.setProps({
      message: error
    });
  }

  protected render(): string {
    return `
      <div>
        {{{TextField 
            name=name 
            label=label 
            placeholder=placeholder
            type=type
            value=value
            onBlur=onBlur
            onFocus=onFocus
            modification=modification
            className=className
            inputClassName=inputClassName
            labelClassName=labelClassName
        }}}
        {{{ErrorComponent ref="errorRef" }}}
      </div>
    `;
  }

}
