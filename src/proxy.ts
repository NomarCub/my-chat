import { OutgoingPacket, InboxDto, IncomingPacket, MessageDto } from "./chat";

export class EventProducer<M> {
  private listeners: { type: keyof M; listener; obj?: Object }[] = [];
  addEventListener<K extends keyof M>(type: K, listener: M[K], obj?: Object) {
    this.listeners.push({ type, listener, obj });
  }
  removeEventListener<K extends keyof M>(type: string, listener: M[K]) {
    this.listeners.splice(
      this.listeners.findIndex(
        (x) => x.type === type && x.listener === listener
      ),
      1
    );
  }
  protected dispatch(type: string, ...args) {
    for (let listener of this.listeners.filter((x) => x.type === type))
      listener.listener.call(listener.obj, ...args);
  }
  removeAllEventListener(obj: Object) {
    if (!obj) throw new Error("Must specify object");
    this.listeners = this.listeners.filter((x) => x.obj !== obj);
  }
}

interface ProxyEventMap {
  login: () => void;
  message: (channelId: string, message: MessageDto) => void;
  conversation: (channelId: string) => void;
}

class Proxy extends EventProducer<ProxyEventMap> {
  private ws: WebSocket;
  inbox: InboxDto | null = null;
  constructor() {
    super();
    this.ws = new WebSocket("wss://raja.aut.bme.hu/chat/");
    this.ws.addEventListener("open", () => {
      this.sendPacket({
        // TODO
        type: "login",
        email: "a@b.c",
        password: "a",
        displayName: "a",
        staySignedIn: true,
      } as OutgoingPacket);
    });

    this.ws.addEventListener("message", (e) => {
      let p = JSON.parse(e.data) as IncomingPacket;
      // TODO
      console.log(p);
      switch (p.type) {
        case "error":
          alert(p.message);
          break;
        case "login":
          this.inbox = p.inbox;
          this.dispatch("login");
          break;
        case "message":
          let cid = p.channelId;
          this.inbox!.conversations.find(
            (x) => x.channelId === cid
          )?.lastMessages.push(p.message);
          this.dispatch("message", cid, p.message);
          break;
        case "conversationAdded":
          this.inbox!.conversations.push(p.conversation);
          this.dispatch("conversation", p.conversation.channelId);
          break;
      }
    });
  }
  sendPacket(packet: OutgoingPacket) {
    this.ws.send(JSON.stringify(packet));
  }
}
export var proxy = new Proxy();
