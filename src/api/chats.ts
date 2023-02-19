import { httpTransport } from "../core/HttpTransport";
import { ApiError, ChatsDTO, TokenDTO } from "./types";
import { applicationJson } from "./headers";

const BASE_URL = "/chats";

export type ChatRequestData = {
  offset?: number;
  limit?: number;
  title?: string;
}

export type TokenRequestData = {
  id: number;
}

export type AddUserInChatData = {
  users: number[],
  chatId: number
}

export const chatsApi = {
  getList: (data?: ChatRequestData) =>
    httpTransport.get<ChatsDTO | ApiError>( BASE_URL, { queryParams: data } ),
  createChat: (data: Pick<ChatRequestData, "title">) =>
    httpTransport.post<ApiError>(BASE_URL, { data: JSON.stringify(data), headers: { ...applicationJson } }),
  deleteChat: (data: { chatId: number }) =>
    httpTransport.delete<ApiError>(BASE_URL, { data: JSON.stringify(data) }),
  getToken: (data: TokenRequestData) =>
    httpTransport.post<TokenDTO | ApiError>(`${BASE_URL}/token/${data.id}`, { data: JSON.stringify({}), headers: { ...applicationJson } }),
  addUser: (data: AddUserInChatData) =>
    httpTransport.put<ApiError>(`${BASE_URL}/users`, { data: JSON.stringify(data), headers: { ...applicationJson } }),
};

