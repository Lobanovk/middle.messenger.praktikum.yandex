import { Dispatch } from "../core/Store";
import { Screens } from "../helpers/screenList";

export const changePage = (
  dispatch: Dispatch<AppState>,
  state: AppState,
  payload: { screen: Screens }
) => {
  const { socket } = state;
  
  socket?.closeConnection(() => dispatch({ messages: [] }));
  
  dispatch({ ...payload, socket: null, });
};
