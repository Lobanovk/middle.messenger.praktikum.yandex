import Login from "./pages_v1/login";

import {renderDOM} from "core";
import registerComponents from "helpers/registerComponents";

registerComponents();

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new Login());
});

