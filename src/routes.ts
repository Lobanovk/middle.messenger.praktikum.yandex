import { getDefaultPropsComponent, getScreenComponent, Screens } from "./helpers/screenList";
import { renderDOM, Router } from "core";
import { Store } from "./core/Store";
import { changePage } from "./services/router";

const routes = [
  {
    path: Screens.Login,
    component: Screens.Login,
    shouldAuthorized: false,
  },
  {
    path: Screens.SignUp,
    component: Screens.SignUp,
    shouldAuthorized: false,
  },
  {
    path: Screens.Messenger,
    component: Screens.Messenger,
    shouldAuthorized: true,
  },
  {
    path: Screens.Error500,
    component: Screens.Error500,
    shouldAuthorized: false,
  },
  {
    path: Screens.Error404,
    component: Screens.Error404,
    shouldAuthorized: false,
  },
  {
    path: Screens.Settings,
    component: Screens.Settings,
    shouldAuthorized: true,
  },
  {
    path: Screens.SettingsChangePassword,
    component: Screens.SettingsChangePassword,
    shouldAuthorized: true,
  },
  {
    path: Screens.SettingsChangeData,
    component: Screens.SettingsChangeData,
    shouldAuthorized: true,
  },
  {
    path: Screens.Logout,
    component: Screens.Logout,
    shouldAuthorized: false,
  }
];

export function initRouter(router: Router, store: Store<AppState>) {
  routes.forEach(route => {
    router.use(route.path, () => {
      const isAuthorized = !!store.getState().user;
      const currentScreen = !!store.getState().screen;

      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch(changePage, { screen: route.component });
        return;
      }

      if (!currentScreen) {
        store.dispatch(changePage, { screen: Screens.Login });
      }
    });
  });

  store.on("changed", (prevState, nextState) => {
    if (!prevState.appIsInit && nextState.appIsInit) {
      router.start();
    }

    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      const defaultProps = getDefaultPropsComponent(nextState.screen);
      renderDOM(new Page(defaultProps));
      document.title = `App / ${Page.componentName}`;
    }
  });
}
