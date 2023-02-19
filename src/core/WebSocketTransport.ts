import EventBus from "./EventBus";

type Events = Values<typeof WebSocketTransport.EVENTS>

type OptionsOpenConnection = {
  userId: number;
  chatId: number;
  token: string;
}

type Message = {
  content?: string;
  type?: string;
}
class WebSocketTransport {
  static EVENTS = {
    SEND_MESSAGE: "flow:send-message",
    SEND_PING: "flow:send-ping",
  };

  eventBus: EventBus<Events>;
  private socket: WebSocket | null;
  url: string;
  intervalId: ReturnType<typeof setInterval> | null = null;
  constructor(url: string) {
    this.eventBus = new EventBus<Events>();
    this.url = url;
    this.socket = null;

    this._registerEvents(this.eventBus);
  }

  private _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(WebSocketTransport.EVENTS.SEND_PING, this._sendPing.bind(this));
    eventBus.on(WebSocketTransport.EVENTS.SEND_MESSAGE, this._sendMessage.bind(this));
  }

  private _registerListeners(socket: WebSocket) {
    socket.addEventListener("open", this._openConnection.bind(this));
    socket.addEventListener("close", this._closeConnection.bind(this));
    socket.addEventListener("error", this._error.bind(this));
  }

  private _removeListeners(socket: WebSocket) {
    socket.removeEventListener("open", this._openConnection.bind(this));
    socket.removeEventListener("close", this._closeConnection.bind(this));
    socket.removeEventListener("message", this._getMessage.bind(this));
    socket.removeEventListener("error", this._error.bind(this));
  }

  openConnection(options: OptionsOpenConnection, callback: (message: MessageEvent) => void) {
    this.socket = new WebSocket(`${this.url}/${options.userId}/${options.chatId}/${options.token}`);
    this._registerListeners(this.socket);
    this._getMessage = callback;
    this.socket.addEventListener("message", this._getMessage);
  }

  sendMessage(message: Message) {
    this.eventBus.emit(WebSocketTransport.EVENTS.SEND_MESSAGE, message);
  }

  closeConnection(callback: any) {
    if (this.socket !== null) {
      this.socket.close();
      callback();
    }
  }

  _destroy() {
    if (this.socket) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      this._removeListeners(this.socket);
      this.socket = null;
    }
  }

  private _error(event: Event) {
    console.log("Ошибка", event);
  }

  private _openConnection() {
    this.eventBus.emit(WebSocketTransport.EVENTS.SEND_PING);
  }

  private _sendPing() {
    this.intervalId = setInterval(() => {
      this.eventBus.emit(WebSocketTransport.EVENTS.SEND_MESSAGE, { type: "ping" });
    }, 1500);
  }

  private _sendMessage(options: Message) {
    if (this.socket) {
      this.socket.send(JSON.stringify(options));
    } else {
      console.log("Откройте соединение");
    }
  }

  private _getMessage(event: MessageEvent) {
    console.log(event.data);
  }

  private _closeConnection(event: CloseEvent) {
    if (event.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }
    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    this._destroy();
  }

}

const webSocketTransport = new WebSocketTransport("wss://ya-praktikum.tech/ws/chats");
export default webSocketTransport;
