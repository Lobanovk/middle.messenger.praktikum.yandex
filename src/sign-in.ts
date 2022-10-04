import registerComponents from "./helpers/registerComponents";
import {renderDOM} from "./core";
import SignIn from "./pages/sign-in";

registerComponents();

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new SignIn())
})
