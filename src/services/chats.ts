import { Dispatch } from "../core/Store";
import { ChatRequestData, chatsApi } from "../api/chats";

import { apiHasError } from "../helpers/typeGards";
import { convertResponseToData } from "../helpers/convert";
import webSocketTransport from "../core/WebSocketTransport";


export const getList = (
  dispatch: Dispatch<AppState>,
  _: AppState,
  payload?: ChatRequestData
) => {
  chatsApi.getList(payload)
    .then(response => {
      if (apiHasError(response)) {
        throw new Error(response.reason);
      }
      return response;
    })
    .then(result => {
      dispatch({ chats: result.map(convertResponseToData<Chat>)});
    })
    .catch(error => console.error(error));
};

export const createChat = (
  dispatch: Dispatch<AppState>,
  _: AppState,
  payload: Pick<ChatRequestData, "title">
) => {
  chatsApi.createChat(payload)
    .then(response => {
      if (apiHasError(response)) {
        throw new Error(response.reason);
      }
    })
    .then(() => chatsApi.getList())
    .then(response => {
      if (apiHasError(response)) {
        throw new Error(response.reason);
      }
      return response;
    })
    .then(result => {
      dispatch({ chats: result.map(convertResponseToData<Chat>)});
    })
    .catch(error => console.error(error));
};

export const addUserInChat = (
  _: Dispatch<AppState>,
  store: AppState,
) => {
  const { selectedUser, selectedIdChat } = store;
  if (selectedUser && selectedIdChat) {
    chatsApi.addUser({
      chatId: selectedIdChat,
      users: [selectedUser.id]
    })
      .then(response => {
        if (apiHasError(response)) {
          throw new Error(response.reason);
        }
      })
      .catch(error => console.error(error));
  }
};
export const getToken = (
  dispatch: Dispatch<AppState>,
  state: AppState,
) => {
  const { user, selectedIdChat, messages } = state;
  chatsApi.getToken({ id: selectedIdChat as number })
    .then(response => {
      if (apiHasError(response)) {
        throw new Error(response.reason);
      }
      return response;
    })
    .then(result => {

      webSocketTransport.openConnection({
        userId: user?.id as number,
        chatId: selectedIdChat as number,
        token: result.token
      }, (event) => {
        if (event.data.type === "message") {

        }
      });
    })
    .catch(error => console.error(error));
};
