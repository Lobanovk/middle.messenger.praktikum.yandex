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

export type ChangeAvatarChatData = {
  chatId: number;
  file: File;
}

export type GetChatUsersData = {
  id: number;
  offset?: number;
  limit?: number;
}

export const chatsApi = {
  getList: (data?: ChatRequestData) =>
    httpTransport.get<ChatsDTO | ApiError>( BASE_URL, { queryParams: data } ),
  createChat: (data: Pick<ChatRequestData, "title">) =>
    httpTransport.post<ApiError>(BASE_URL, { data: JSON.stringify(data), headers: { ...applicationJson } }),
  deleteChat: (data: { chatId: number }) =>
    httpTransport.delete<ApiError>(BASE_URL, { data: JSON.stringify(data), headers: { ...applicationJson }  }),
  getToken: (data: TokenRequestData) =>
    httpTransport.post<TokenDTO | ApiError>(`${BASE_URL}/token/${data.id}`, { data: JSON.stringify({}), headers: { ...applicationJson } }),
  addUser: (data: AddUserInChatData) =>
    httpTransport.put<ApiError>(`${BASE_URL}/users`, { data: JSON.stringify(data), headers: { ...applicationJson } }),
  changeAvatar: (data: ChangeAvatarChatData) => {
    const formData = new FormData();
    formData.append("chatId", `${data.chatId}`);
    formData.append("avatar", data.file);

    return httpTransport.put<Chat | ApiError>(`${BASE_URL}/avatar`, { data: formData });
  },
  getChatUsers: ({id, ...data}: GetChatUsersData) => httpTransport.get<User[] | ApiError>(`${BASE_URL}/${id}/users`, { queryParams: data } ),
  deleteUser: (data: AddUserInChatData) =>
    httpTransport.delete<ApiError>(`${BASE_URL}/users`, { data: JSON.stringify(data), headers: { ...applicationJson } }),
};

