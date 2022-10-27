import { Router } from "core";
import registerComponents from "helpers/registerComponents";
import { Store } from "./core/Store";
import { defaultState } from "./store/app";
import { initRouter } from "./routes";
import { initApp } from "./services/initApp";

registerComponents();

document.addEventListener("DOMContentLoaded", () => {
  const store = new Store<AppState>(defaultState);
  const router = new Router();

  window.store = store;
  window.router = router;

  store.on("changed", (_, nexState) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (process.env.DEBUG) {
      console.log(
        "%cstore update",
        "background: #222, color: #bada55",
        nexState
      );
    }
  });

  initRouter(router, store);

  store.dispatch(initApp);
});

