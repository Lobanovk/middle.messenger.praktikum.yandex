import { Dispatch } from "../core/Store";
import { UserPasswordRequestData, UserProfileRequestData, usersApi } from "../api/users";
import { apiHasError } from "../helpers/typeGards";
import { convertResponseToData } from "../helpers/convert";
import { Screens } from "../helpers/screenList";

export const changeUserProfile = (
  dispatch: Dispatch<AppState>,
  _: AppState,
  action: UserProfileRequestData
) => {
  usersApi.profile(action)
    .then(response => {
      if (apiHasError(response)) {
        throw new Error(response.reason);
      }
      return response;
    })
    .then(result => {
      dispatch({ user: convertResponseToData<User>(result as PlainObject) });
      window.router.go(Screens.Settings);
    })
    .catch(err => console.error(err));
};

export const changeUserPassword = (data: UserPasswordRequestData) => {
  usersApi.password({
    oldPassword: data.oldPassword,
    newPassword: data.newPassword
  })
    .then(response => {
      if (apiHasError(response)) {
        throw new Error(response.reason);
      }
      window.router.go(Screens.Settings);
    })
    .catch(err => console.error(err));
};

export const changeUserAvatar = (
  dispatch: Dispatch<AppState>,
  _: AppState,
  action: File
) => {
  usersApi.avatar(action)
    .then(response => {
      if (apiHasError(response)) {
        throw new Error(response.reason);
      }
      return response;
    })
    .then(result => {
      dispatch({ user: convertResponseToData<User>(result as PlainObject) });
    })
    .catch(err => console.error(err));
};
