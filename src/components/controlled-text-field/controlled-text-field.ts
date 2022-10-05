import {Component} from "../../core";
import {TextFieldProps} from "../text-field/text-field";
import {validation, ValidationKeys} from "../../helpers/validation";

interface ControlledTextFieldProps extends Omit<TextFieldProps, "onBlur" | "onFocus"> {
  errorMessage: string;
  value: string;
  inputProps: {
    className: string
  };
  labelProps: {
    className: string;
  };
  onFocus: (event: FocusEvent, el: HTMLInputElement, component?: Component) => void;
  onBlur: (event: FocusEvent, el: HTMLInputElement, component?: Component) => void;
}

export class ControlledTextField extends Component {
  static componentName = "ControlledTextField";
  private firstFocusOnEl = true;

  inputValidation(el: HTMLInputElement) {
    let type = el.name;
    if (["firstName", "lastName", "nameInChat"].includes(el.name)) {
      type = "names";
    }
    if ('oldPassword' === el.name) {
      type = "password";
    }
    const error = validation((type as ValidationKeys), el.value);
    this.refs.errorRef.setProps({
      message: error
    })
  }

  constructor({ ...props }: ControlledTextFieldProps) {
    super({
      ...props,
      onFocus: ((event: FocusEvent) => {
        if (props.onFocus) {
          props.onFocus(event, event.target as HTMLInputElement)
          return;
        }
        if (!this.firstFocusOnEl) {
          this.inputValidation(event.target as HTMLInputElement);
        } else {
          this.firstFocusOnEl = false;
        }
      }),
      onBlur: ((event: FocusEvent) => {
        if (props.onBlur) {
          props.onBlur(event, event.target as HTMLInputElement, this);
          return
        }
        const el = event.target as HTMLInputElement;
        this.setProps({
          value: el.value,
        });
        this.inputValidation(el);
      })
    });
  }

  protected render(): string {
    // language = hbs
    return `
      <div>
        {{{TextField 
            name=name 
            label=label 
            placeholder=placeholder
            type=type
            value=value
            onBlur=onBlur
            onInput=onInput
            onFocus=onFocus
            modifications=modifications
            className=className
            inputProps=inputProps
            labelProps=labelProps
        }}}
        {{{Error ref="errorRef" }}}
      </div>
    `
  }
}