import { Store } from "../src/core/Store";
import e, { Router } from "express";
import { Screens } from "../src/helpers/screenList";

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  export type ComponentEvents = { events?: Record< string, EventListenerOrEventListenerObject | undefined> }

  export type AppState = {
    screen: Screens | null;
    appIsInit: boolean;
    user: User | null;
    chats: Chat[];
    selectedIdChat: number | null;
    messages: Message[];

    usersList: User[];
    selectedUser: User | null;
  };

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
  };

  export type Chat = {
    id: number;
    title: string;
    avatar: string;
    createdBy: number;
    unreadCount: number;
    lastMessage?: {
      user: Pick<User, 'firstName' | 'secondName' | 'avatar' | 'email' | 'login' | 'phone'>;
      time: string;
      content: string
    }
  };

  export type Message = {
    id: string;
    time: string;
    userId: string;
    content: string;
    type: string;
  }

  export type PlainObject<T = any> = {
    [k in string]: T;
  };

  interface Window {
    store: Store<AppState>
    router: Router;
  }
}

export {}
