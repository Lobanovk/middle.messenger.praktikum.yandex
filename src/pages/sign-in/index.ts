import registerComponents from "../../helpers/registerComponents";
import {renderDOM} from "../../core";
import { SignIn } from "./sign-in";


registerComponents();

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new SignIn())
})

