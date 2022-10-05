import {Component} from "../../core";

import './input-download.css';

interface InputDownloadProps {
  name: string;
  label: string;
  onClick: () => void;
  onChange: () => void;
}

export class InputDownload extends Component{
  constructor({onClick, ...props}: InputDownloadProps) {
    super({
      ...props,
      value: "",
      events: {
        click: (event: MouseEvent) => {
          const input = (event.target as HTMLInputElement).querySelector("input");
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
    `
  }
}