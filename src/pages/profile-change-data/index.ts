import registerComponents from "../../helpers/registerComponents";
import { renderDOM } from "../../core";
import {ProfileChangeData} from "./profile-change-data";


registerComponents();

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new ProfileChangeData())
})

