import { httpTransport } from "../core/HttpTransport";
import { ApiError, UserDTO } from "./types";
import { applicationJson } from "./headers";
import { convertDataForRequest } from "../helpers/convert";

const BASE_URL = "/auth";

type LoginRequestData = {
  login: string;
  password: string;
}

type UserRequestData = {
  firstName: string,
  secondName: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export const authApi = {
  me: () => httpTransport.get<UserDTO | ApiError>(`${BASE_URL}/user`),
  create: (data: UserRequestData) =>
    httpTransport.post<ApiError | { id: number }>(
      `${BASE_URL}/signup`,
      { data: JSON.stringify(convertDataForRequest(data)), headers: { ...applicationJson } }
    ),
  login: (data: LoginRequestData) =>
    httpTransport.post<ApiError | object>(
      `${BASE_URL}/signin`,
      { data: JSON.stringify(convertDataForRequest(data)) , headers: { ...applicationJson } }
    ),
  logout: () => httpTransport.post(`${BASE_URL}/logout`),
};
