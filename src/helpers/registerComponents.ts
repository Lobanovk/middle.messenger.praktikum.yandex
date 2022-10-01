import { registerComponent } from "../core";

import Button from "components/button";
import LayoutLoginForm from "components/layout-login-form";
import LoginForm from "components/login-form";
import Link from "components/link";
import TextField from "components/text-field";
import { Input } from "components/text-field/input";
import ControlledTextField from "components/controlled-text-field";
import ErrorComponent from "components/error";


export default () => {
  registerComponent(Input)
  registerComponent(Button);
  registerComponent(LayoutLoginForm);
  registerComponent(LoginForm);
  registerComponent(Link);
  registerComponent(TextField);
  registerComponent(ControlledTextField);
  registerComponent(ErrorComponent);
}