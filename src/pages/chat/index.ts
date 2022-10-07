import registerComponents from "../../helpers/registerComponents";
import { renderDOM } from "../../core";
import {Chat} from "./chat";


registerComponents();

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new Chat())
})

