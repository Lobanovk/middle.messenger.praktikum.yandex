import Login from "pages/login";

import {Component, renderDOM} from "core";
import registerComponents from "helpers/registerComponents";
import SignIn from "./pages/sign-in";
import Profile from "./pages/profile";

registerComponents();

document.addEventListener('DOMContentLoaded', () => {
  // let App: Component = new Login();
  // let App = new SignIn();
  let App = new Profile();
  renderDOM(App)
})

