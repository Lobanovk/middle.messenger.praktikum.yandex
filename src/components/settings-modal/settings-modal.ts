import { Component } from "core";
import ErrorComponent from "../error-component";
import { withStore } from "../../helpers/withStore";
import { Store } from "../../core/Store";
import { changeUserAvatar } from "../../services/user";

type IncomingProps = {
  onClose: () => void;
  store: Store<AppState>;
}

type Props = {
  onSubmit: (event: SubmitEvent) => void;
  file: File | null,
  onUploadFile: (event: Event) => void;
  onClick: (event: MouseEvent) => void;
  store: IncomingProps["store"]
}

type Refs = {
  errorRef: ErrorComponent
}

class SettingsModal extends Component<Props, Refs> {
  static componentName = "SettingsModal";

  constructor({ onClose, ...props }: IncomingProps) {
    super({
      ...props,
      file: null,
      onSubmit: event => {
        event.preventDefault();
        if (!this.props.file) {
          this.refs.errorRef.setProps({ message: "Нужно выбрать файл" });
          return;
        }
        this.props.store.dispatch(changeUserAvatar, this.props.file);
        onClose();
      },
      onUploadFile: (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          this.setProps({
            file
          });
        }
      },
      onClick: (event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }
    });
  }

  protected render(): string {
    return `
      {{#Modal onClick=onClick}}
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

// @ts-expect-error onClose must be in Props
export default withStore(SettingsModal);
