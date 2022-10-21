import { registerComponent } from "../core";

import Link from "../components_v1/link";
import Text from "../components_v1/text";
import CardError from "components_v1/card-error";
import MiniChat from "components/mini-chat";
import FormChatContent from "components/form-chat-content";
import ChatContent from "components/chat-content";
import CardMessage from "components/card-message";
import Messages from "components/messages";
import Input from "../components_v1/inputs/input";
import Button from "../components_v1/buttons/button";
import TextField from "../components_v1/inputs/text-field";
import ControlledTextField from "../components_v1/inputs/controlled-text-field";
import DownloadField from "../components_v1/inputs/download-field";
import ErrorComponent from "../components_v1/error-component";
import FabButton from "../components_v1/buttons/fab-button";
import Avatar from "../components_v1/avatar";
import Modal from "../components_v1/layouts/modal";
import { Wrapper } from "../components_v1/layouts/wrapper/wrapper";
import Form from "../components_v1/form";
import { LoginFormInputsWrapper } from "../components_v1/login-form-inputs-wrapper/login-form-inputs-wrapper";
import { LoginFormActions } from "../components_v1/login-form-actions/login-form-actions";
import {
  ArrowRightIcon,
  AttachmentsIcon, BigAvatarIcon,
  ClipIcon,
  DoubleCheckIcon,
  LocationIcon, MediaIcon, MoreVertIcon
} from "../components_v1/icons";
import { BackToChats } from "../components_v1/back-to-chats/back-to-chats";
import { ChatWrapper } from "../components_v1/layouts/chat-wrapper/chat-wrapper";
import ProfileFormActions from "../components_v1/profile-form-actions";
import { ProfileModal } from "../components_v1/profile-modal/profile-modal";


export default () => {
  registerComponent(Input);
  registerComponent(Button);
  registerComponent(Link);
  registerComponent(TextField);
  registerComponent(ControlledTextField);
  registerComponent(ErrorComponent);
  registerComponent(FabButton);
  registerComponent(Avatar);
  registerComponent(Text);
  registerComponent(Modal);
  registerComponent(DownloadField);
  registerComponent(CardError);
  registerComponent(MiniChat);
  registerComponent(FormChatContent);
  registerComponent(ChatContent);
  registerComponent(CardMessage);
  registerComponent(Messages);
  registerComponent(Wrapper);
  registerComponent(Form);
  registerComponent(LoginFormInputsWrapper);
  registerComponent(LoginFormActions);
  registerComponent(ArrowRightIcon);
  registerComponent(MediaIcon);
  registerComponent(LocationIcon);
  registerComponent(ClipIcon);
  registerComponent(DoubleCheckIcon);
  registerComponent(BigAvatarIcon);
  registerComponent(AttachmentsIcon);
  registerComponent(MoreVertIcon);
  registerComponent(BackToChats);
  registerComponent(ChatWrapper);
  registerComponent(ProfileFormActions);
  registerComponent(ProfileModal);
};
