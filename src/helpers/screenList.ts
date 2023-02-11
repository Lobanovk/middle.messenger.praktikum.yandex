import { ComponentClass } from "core";
import Login from "pages/login";
import SignUp from "pages/sign-up";
import Messages from "pages/messages";
import ErrorPage from "pages/error-page";
import Settings from "pages/settings";
import Logout from "pages/logout/logout";

import { PageType } from "pages/settings/settings";

export enum Screens {
  Login = "/",
  SignUp = "/sign-up",
  Messenger = "/messenger",
  Settings = "/settings",
  SettingsChangeData = "/settings/change-data",
  SettingsChangePassword = "/settings/change-password",
  Error404 = "/404",
  Error500 = "/500",
  Logout = "/logout",
}


const map: Record<Screens, ComponentClass<any>> = {
  [Screens.Login]: Login,
  [Screens.SignUp]: SignUp,
  // @ts-expect-error is missing the following properties from type 'ComponentClass<any>': apply, call, bind, prototype, and 5 more.
  [Screens.Messenger]: Messages,
  // @ts-expect-error is missing the following properties from type 'ComponentClass<any>': apply, call, bind, prototype, and 5 more.
  [Screens.Logout]: Logout,
  [Screens.Settings]: Settings,
  [Screens.SettingsChangeData]: Settings,
  [Screens.SettingsChangePassword]: Settings,
  [Screens.Error404]: ErrorPage,
  [Screens.Error500]: ErrorPage,
};

const mapDefaultProps: Record<Screens, Record<string, any>> = {
  [Screens.Login]: {},
  [Screens.Logout]: {},
  [Screens.SignUp]: {},
  [Screens.Messenger]: {},
  [Screens.Settings]: { type: PageType.DEFAULT },
  [Screens.SettingsChangeData]: { type: PageType.CHANGE_DATA },
  [Screens.SettingsChangePassword]: { type: PageType.CHANGE_PASSWORD },
  [Screens.Error404]: {
    type: "404",
    title: "404",
    description: "Не туда попали",
    link: {
      text: "Назад к чатам",
      href: Screens.Messenger,
    }},
  [Screens.Error500]: {
    type: "500",
    title: "500",
    description: "Мы уже фиксим",
    link: {
      text: "Назад к чатам",
      href: Screens.Messenger,
    }},
};

export const getScreenComponent = (screen: Screens): ComponentClass<any> => {
  return map[screen];
};

export const getDefaultPropsComponent = (screen: Screens): Record<string, any> => {
  return mapDefaultProps[screen];
};
