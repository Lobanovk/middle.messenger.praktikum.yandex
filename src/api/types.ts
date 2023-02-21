export type ApiError = {
  reason: string;
}

export type UserDTO = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export type ChatDTO = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number,
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    },
    time: string;
    content: string;
  }
}

export type ChatsDTO = ChatDTO[];

export type TokenDTO = {
  token: string;
}
