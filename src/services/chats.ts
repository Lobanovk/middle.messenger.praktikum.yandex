import { Dispatch } from "../core/Store";
import { ChatRequestData, chatsApi } from "../api/chats";
import { apiHasError } from "../helpers/typeGards";
import { convertResponseToData } from "../helpers/convert";

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
        return response;
      })
      .catch(error => console.error(error));
  }
};

export const changeAvatarInChat = (
  dispatch: Dispatch<AppState>,
  state: AppState,
  payload: File
) => {
  const { chats, selectedIdChat } = state;
  chatsApi.changeAvatar({
    chatId: selectedIdChat as number,
    file: payload
  })
    .then(response => {
      if (apiHasError(response)) {
        throw new Error(response.reason);
      }

      return response;
    })
    .then(result => {
      const newChats = chats.map(chat => {
        if (chat.id === result.id) {
          return {
            ...chat,
            ...result
          };
        }

        return chat;
      });
      dispatch({ chats: newChats, selectedAvatarChat: result.avatar });
    })
    .catch(error => console.error(error));
};

export const getChatsUsers = (
  dispatch: Dispatch<AppState>,
  state: AppState,
) => {
  const { selectedIdChat, user } = state;
  chatsApi.getChatUsers({ id: selectedIdChat as number })
    .then(response => {
      if (apiHasError(response)) {
        throw new Error(response.reason);
      }
      return response;
    })
    .then(result => dispatch({ usersList: result.map(convertResponseToData<User>).filter(val => user?.id !== val.id) }))
    .catch(error => console.error(error));
};
export const deleteUserFromChat = (
  dispatch: Dispatch<AppState>,
  store: AppState,
) => {
  const { selectedUser, selectedIdChat } = store;
  if (selectedUser && selectedIdChat) {
    chatsApi.deleteUser({
      chatId: selectedIdChat,
      users: [selectedUser.id]
    })
      .then(response => {
        if (apiHasError(response)) {
          throw new Error(response.reason);
        }
        return response;
      })
      .then(() => {
        dispatch({ selectedUser: null, usersList: [] });
      })
      .catch(error => console.error(error));
  }
};

export const deleteChat = (
  dispatch: Dispatch<AppState>,
  state: AppState
) => {
  const { selectedIdChat } = state;

  chatsApi.deleteChat({ chatId: selectedIdChat as number })
    .then(response => {
      if (apiHasError(response)) {
        throw new Error(response.reason);
      }
      return response;
    })
    .then(() => chatsApi.getList())
    .then(response => {
      if (apiHasError(response)) {
        throw new Error(response.reason);
      }
      return response;
    })
    .then(result => dispatch({ chats: result.map(convertResponseToData<Chat>)}))
    .catch(error => console.error(error));

};
