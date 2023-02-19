import { Dispatch } from "../core/Store";
import { UserPasswordRequestData, UserProfileRequestData, userApi } from "../api/user";
import { apiHasError } from "../helpers/typeGards";
import { convertResponseToData } from "../helpers/convert";
import { Screens } from "../helpers/screenList";

export const changeUserProfile = (
  dispatch: Dispatch<AppState>,
  _: AppState,
  action: UserProfileRequestData
) => {
  userApi.profile(action)
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
  userApi.password({
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
  payload: File
) => {
  userApi.avatar(payload)
    .then(response => {
      if (apiHasError(response)) {
        throw new Error(response.reason);
      }
      return response;
    })
    .then(result => {
      console.log(result);
      dispatch({ user: convertResponseToData<User>(result as PlainObject) });
    })
    .catch(err => console.error(err));
};

export const getUsersList = (
  dispatch: Dispatch<AppState>,
  _: AppState,
  payload: { login: string }
) => {
  userApi.searchUser(payload)
    .then(response => {
      if(apiHasError(response)) {
        throw new Error(response.reason);
      }
      return response;
    })
    .then(result => {
      dispatch({ usersList: result.map(convertResponseToData<User>) });
    })
    .catch(error => console.error(error));
};
