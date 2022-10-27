import { Dispatch } from "../core/Store";
import { authApi } from "../api/auth";
import { apiHasError } from "../helpers/typeGards";
import { convertResponseToData } from "../helpers/convert";
import { Screens } from "../helpers/screenList";

type LoginPayload = {
  login: string,
  password: string,
}

export const login = (
  dispatch: Dispatch<AppState>,
  _: AppState,
  action: LoginPayload
) => {
  authApi.login(action)
    .then(response => {
      if (apiHasError(response)) {
        throw new Error(response.reason);
      }
    })
    .then(() => authApi.me())
    .then(response => {
      if (apiHasError(response)) {
        throw new Error(response.reason);
      }
      return response;
    })
    .then(result => {
      dispatch({ user: convertResponseToData<User>(result as PlainObject) });
      window.router.go(Screens.Messenger);
    })
    .catch(err => console.error(err));
};

export const logout = (dispatch: Dispatch<AppState>) => {
  authApi.logout()
    .then(() => {
      dispatch({ user: null });
      window.router.go(Screens.Login);
    })
    .catch(err => console.error(err));
};
