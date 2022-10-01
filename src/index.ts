import Login from "pages/Login";

import { renderDOM } from "core";
import registerComponents from "helpers/registerComponents";

registerComponents();

document.addEventListener('DOMContentLoaded', () => {
  const App = new Login();

  renderDOM(App)
})

