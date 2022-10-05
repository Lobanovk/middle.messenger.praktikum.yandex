import registerComponents from "../../helpers/registerComponents";
import { renderDOM } from "../../core";
import {ProfileChangePassword} from "./profile-change-password";


registerComponents();

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new ProfileChangePassword())
})

