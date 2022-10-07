import {Component} from "../../core";
import arrowRightIcon from "./templates/arrow-right";
import attachments from "./templates/attachments";
import bigAvatar from "./templates/big-avatar";
import clip from "./templates/clip";
import close from "./templates/close";
import doubleCheck from "./templates/double-check";
import location from './templates/location';
import media from './templates/media';
import moreVert from './templates/more-vert';

interface SvgIconProps {
  className: string;
  type: string;
}

export class SvgIcon extends Component{
  constructor(props: SvgIconProps) {
    super(props);
  }

  protected render(): string {
    switch (this.props.type) {
      case "arrow-right":
        return arrowRightIcon(this.props);
      case "attachments":
        return attachments(this.props);
      case "big-avatar":
        return bigAvatar(this.props);
      case "clip":
        return clip(this.props);
      case "close":
        return close(this.props);
      case "double-check":
        return doubleCheck(this.props);
      case "location":
        return location(this.props);
      case "media":
        return media(this.props);
      case "more-vert":
        return moreVert(this.props);
      default:
        return ""
    }
  }
}