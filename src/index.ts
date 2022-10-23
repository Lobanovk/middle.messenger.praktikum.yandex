import { renderDOM } from "core";
import registerComponents from "helpers/registerComponents";
import Messages from "./pages/messages";

registerComponents();

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new Messages());
});

