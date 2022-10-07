import { registerComponent } from "../core";

import Button from "components/button";
import LayoutLogin from "components/layout-login";
import LoginForm from "components/login-form";
import Link from "components/link";
import TextField from "components/text-field";
import Input from "components/input";
import ControlledTextField from "components/controlled-text-field";
import ErrorComponent from "components/error";
import FabButton from "components/fab-button";
import Avatar from "components/avatar";
import Text from "components/text";
import ProfileActions from "components/profile-actions";
import ProfileForm from "components/profile-form";
import Modal from "components/modal";
import ModalForm from "components/modal-form";
import InputDownload from "components/input-download";
import SvgIcon from "components/icons";
import CardError from "components/card-error";
import MiniChat from "components/mini-chat";
import FormChatContent from "components/form-chat-content";
import ChatContent from "components/chat-content";
import CardMessage from "components/card-message";
import Messages from "components/messages";


export default () => {
  registerComponent(Input);
  registerComponent(Button);
  registerComponent(LayoutLogin);
  registerComponent(LoginForm);
  registerComponent(Link);
  registerComponent(TextField);
  registerComponent(ControlledTextField);
  registerComponent(ErrorComponent);
  registerComponent(FabButton);
  registerComponent(Avatar);
  registerComponent(Text);
  registerComponent(ProfileActions);
  registerComponent(ProfileForm)
  registerComponent(Modal);
  registerComponent(ModalForm);
  registerComponent(InputDownload);
  registerComponent(SvgIcon);
  registerComponent(CardError);
  registerComponent(MiniChat);
  registerComponent(FormChatContent);
  registerComponent(ChatContent);
  registerComponent(CardMessage);
  registerComponent(Messages);
}