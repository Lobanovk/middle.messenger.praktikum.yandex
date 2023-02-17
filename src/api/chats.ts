import { httpTransport } from "../core/HttpTransport";
import { ApiError, ChatsDTO } from "./types";
import { applicationJson } from "./headers";

const BASE_URL = "/chats";

export type ChatRequestData = {
  offset?: number;
  limit?: number;
  title?: string;
}

export const chatsApi = {
  getList: (data?: ChatRequestData) =>
    httpTransport.get<ChatsDTO | ApiError>( BASE_URL, { queryParams: data } ),
  createChat: (data: Pick<ChatRequestData, "title">) =>
    httpTransport.post<ApiError>(BASE_URL, { data: JSON.stringify(data), headers: { ...applicationJson } }),
  deleteChat: (data: { chatId: number }) =>
    httpTransport.delete<ApiError>(BASE_URL, { data: JSON.stringify(data) }),

};

