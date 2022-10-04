import Login from "pages/login";

import {Component, renderDOM} from "core";
import registerComponents from "helpers/registerComponents";
import SignIn from "./pages/sign-in";
import Profile from "./pages/profile";

registerComponents();

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new Login())
})

