import { Dispatch } from "../core/Store";
import { authApi } from "../api/auth";
import { apiHasError } from "../helpers/typeGards";
import { convertResponseToData } from "../helpers/convert";

export function initApp(dispatch: Dispatch<AppState>) {
  authApi.me()
    .then(response => {
      if (apiHasError(response)) {
        throw new Error(response.reason);
      }
      return response;
    })
    .then(result => {
      dispatch({ user: convertResponseToData<User>(result as PlainObject) });
    })
    .catch(err => console.error(err))
    .then(() => {
      dispatch({ appIsInit: true });
    });
}
