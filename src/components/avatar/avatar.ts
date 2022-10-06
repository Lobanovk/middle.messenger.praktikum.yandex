import {Component} from "../../core";

import './avatar.css'

interface AvatarProps {
  profileMode?: boolean;
  changeAvatarAction?: boolean;
  onClick: () => void;
}

export class Avatar extends Component{
  constructor({onClick, ...props}: AvatarProps) {
    super({ ...props, events: { click: onClick } });
  }

  protected render(): string {
    return `
      <div class="avatar {{#if profileMode}}avatar_big{{/if}}">
          {{#if profileMode}}
            <div data-slot="1"></div>
          {{/if}}
          {{#if changeAvatarAction}} <div class="avatar__change">Поменять аватар</div> {{/if}}
      </div>
    `
  }
}