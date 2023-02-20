import { Dispatch } from "../core/Store";
import { chatsApi } from "../api/chats";
import { apiHasError } from "../helpers/typeGards";
import WebSocketTransport from "../core/WebSocketTransport";
import { convertResponseToData, parseDate } from "../helpers/convert";
const parseMessage = (
  dispatch: Dispatch<AppState>,
  state: AppState,
  payload: Message | Message[]
) => {
  const { messages } = state;
  if (Array.isArray(payload)) {
    dispatch({ messages: payload.map( value => ({
      ...convertResponseToData<Message>(value),
      time: parseDate(value.time)
    })).reverse() });
  } else {
    if (payload.type === "message") {
      const newMessages = [...messages, {
        ...convertResponseToData<Message>(payload),
        time: parseDate(payload.time)
      }];
      dispatch({ messages: newMessages });
    }
  }
};
export const createSocketConnection = (
  dispatch: Dispatch<AppState>,
  store: AppState
) => {
  const { selectedIdChat, user } = store;
  const socket = WebSocketTransport.instance;
  dispatch({ socket });
  chatsApi.getToken({ id: selectedIdChat as number })
    .then(response => {
      if (apiHasError(response)) {
        throw new Error(response.reason);
      }
      return response;
    })
    .then(({ token }) => {
      socket.openConnection(
        {
          userId: user?.id as number,
          chatId: selectedIdChat as number,
          token: token
        },
        {
          getMessage: message => {
            dispatch(parseMessage, JSON.parse(message.data));
          },
          clear: () => {
            dispatch({ messages: [] });
          }
        });
    })
    .catch(error => console.error(error));
};
