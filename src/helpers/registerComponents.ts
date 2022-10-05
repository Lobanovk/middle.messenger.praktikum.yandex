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
  registerComponent(InputDownload)
}