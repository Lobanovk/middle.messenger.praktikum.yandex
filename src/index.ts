import { Router } from "core";
import registerComponents from "helpers/registerComponents";
import { Store } from "./core/Store";
import { defaultState } from "./store/app";
import { initRouter } from "./routes";
import { initApp } from "./services/initApp";
import "./styles/style.css";

registerComponents();

document.addEventListener("DOMContentLoaded", () => {
  const store = new Store<AppState>(defaultState);
  const router = new Router();

  window.store = store;
  window.router = router;

  initRouter(router, store);

  store.dispatch(initApp);
});

