import { registerComponent } from "core";

import Link from "components/link";
import Text from "components/text";
import CardError from "components/card-error";
import Input from "components/inputs/input";
import Button from "components/buttons/button";
import TextField from "components/inputs/text-field";
import ControlledTextField from "components/inputs/controlled-text-field";
import DownloadField from "components/inputs/download-field";
import ErrorComponent from "components/error-component";
import FabButton from "components/buttons/fab-button";
import Avatar from "components/avatar";
import Modal from "components/layouts/modal";
import Wrapper from "components/layouts/wrapper";
import Form from "components/form";
import LoginFormInputsWrapper from "components/login-form-inputs-wrapper";
import LoginFormActions from "components/login-form-actions";
import {
  ArrowRightIcon,
  AttachmentsIcon, BigAvatarIcon,
  ClipIcon,
  DoubleCheckIcon,
  LocationIcon, MediaIcon, MoreVertIcon
} from "components/icons";
import BackToChats from "components/back-to-chats";
import ChatWrapper from "components/layouts/chat-wrapper";
import SettingsFormActions from "components/settings-form-actions";
import SettingsModal from "components/settings-modal";
import Person from "components/person";
import MessageContent from "components/message-content";
import MessageForm from "components/message-form";
import MessageData from "components/message-data";
import MessageDataItem from "components/message-data-item";


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
  registerComponent(SettingsFormActions);
  registerComponent(SettingsModal);
  registerComponent(Person);
  registerComponent(MessageContent);
  registerComponent(MessageForm);
  registerComponent(MessageData);
  registerComponent(MessageDataItem);
};
