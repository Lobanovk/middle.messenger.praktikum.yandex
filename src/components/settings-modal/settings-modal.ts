import { Component } from "core";
import ErrorComponent from "../error-component";

type IncomingProps = {
  onClose: () => void;
}

type Props = {
  onSubmit: (event: SubmitEvent) => void;
  file: File | null,
  onUploadFile: (event: Event) => void;
}

type Refs = {
  errorRef: ErrorComponent
}

export class SettingsModal extends Component<Props, Refs> {
  static componentName = "SettingsModal";

  constructor({ onClose }: IncomingProps) {
    super({
      file: null,
      onSubmit: event => {
        event.preventDefault();
        if (!this.props.file) {
          this.refs.errorRef.setProps({ message: "Нужно выбрать файл" });
          return;
        }
        console.log(this.props.file, "submit");
        onClose();
      },
      onUploadFile: (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          this.setProps({
            file
          });
        }
      }
    });
  }

  protected render(): string {
    return `
      {{#Modal}}
        {{#Form className="pane" onSubmit=onSubmit}}
          <h4 class="pane__title">Загрузите файл</h4>
          <div class="pane__content">
            {{#if file}}
                <div class="pane__upload-file">
                    ${this.props.file?.name}
                </div>
            {{else}}
                {{{DownloadField 
                    name="file-download" 
                    label="Выбрать файл на компьютере"
                    onChange=onUploadFile
                }}}
            {{/if}}
          </div>
          {{{Button text="Поменять" }}}
          {{{ErrorComponent ref="errorRef"}}}
        {{/Form}}
      {{/Modal}}
    `;
  }
}
