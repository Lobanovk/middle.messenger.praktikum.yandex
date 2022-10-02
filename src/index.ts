import Login from "pages/Login";

import {Component, renderDOM} from "core";
import registerComponents from "helpers/registerComponents";
import SignIn from "./pages/SignIn";

registerComponents();

document.addEventListener('DOMContentLoaded', () => {
  let App: Component = new Login();
  App = new SignIn();
  renderDOM(App)
})

