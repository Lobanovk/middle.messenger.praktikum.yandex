import registerComponents from "../../helpers/registerComponents";
import { renderDOM } from "../../core";
import { Profile } from "./profile";


registerComponents();

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new Profile())
})

