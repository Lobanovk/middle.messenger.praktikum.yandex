import {Component} from "core";

import './text.css';

interface TextProps {
  label: string;
  value: string;
}

export class Text extends Component {
  constructor(props: TextProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="profile-information-row">
        <p class="profile-information-row__title">{{ label }}</p>
        <p class="profile-information-row__content">{{ value }}</p>
      </div>
    `
  }
}