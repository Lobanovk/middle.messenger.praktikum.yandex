import Login from "pages/login";

import {renderDOM} from "core";
import registerComponents from "helpers/registerComponents";

registerComponents();

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new Login())
})

