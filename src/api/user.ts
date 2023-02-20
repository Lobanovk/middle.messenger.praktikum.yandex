import { ApiError, UserDTO } from "./types";
import { httpTransport } from "../core/HttpTransport";
import { applicationJson } from "./headers";
import { convertDataForRequest } from "../helpers/convert";

const BASE_URL = "/user";

export type UserProfileRequestData = Omit<User, "id" | "avatar">

export type UserPasswordRequestData = {
  oldPassword: string;
  password: string;
  newPassword: string;
}

export const userApi = {
  profile: (data: UserProfileRequestData) =>
    httpTransport.put<UserDTO | ApiError>(
      `${BASE_URL}/profile`,
      { data: JSON.stringify(convertDataForRequest(data)), headers: { ...applicationJson } }
    ),
  avatar: (data: File) => {
    const body = new FormData();
    body.append("avatar", data);

    return httpTransport.put<UserDTO | ApiError>(
      `${BASE_URL}/profile/avatar`,
      { data: body }
    );
  },
  password: (data: Omit<UserPasswordRequestData, "password">) =>
    httpTransport.put<UserDTO | ApiError>(
      `${BASE_URL}/password`,
      { data: JSON.stringify(data), headers: { ...applicationJson } }
    ),
  getUser: (id: string) =>
    httpTransport.get<UserDTO | ApiError>(`${BASE_URL}/${id}`),
  searchUser: (data: { login: string }) =>
    httpTransport.post<UserDTO[] | ApiError>(
      `${BASE_URL}/search`,
      { data: JSON.stringify(data), headers: { ...applicationJson } }
    )
};

