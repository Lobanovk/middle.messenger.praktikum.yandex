import { Component } from "core";

type IncomingProps = {
  name: string;
  label: string;
  onChange: () => void;
}

type Props = IncomingProps & ComponentEvents

export class DownloadField extends Component<Props> {
  static componentName = "DownloadField";

  constructor(props: IncomingProps) {
    super({
      ...props,
      events: {
        click: event => {
          const input = (event.target as HTMLDivElement).querySelector("input");
          if (input) input.click();
        }
      }
    });
  }

  protected render(): string {
    return `
      <div class="file-upload">
        <label class="file-upload__label" for="{{name}}">
            {{label}}
            {{{Input 
              type="file"
              name=name
              isHidden=true
              onChange=onChange
            }}}
        </label>
      </div>
    `;
  }
}
