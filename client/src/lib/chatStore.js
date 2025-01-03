class ChatStore {
  constructor(userStore) {
    this.chatId = null;
    this.user = null;
    this.isCurrentUserBlocked = false;
    this.isReceiverBlocked = false;
    this.userStore = userStore;

    this.subscribers = [];
  }

  subscribe(fn) {
    this.subscribers.push(fn);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== fn);
    };
  }

  notify() {
    this.subscribers.forEach(sub => sub(this.getState()));
  }

  changeChat(chatId, user) {
    const currentUser = this.userStore.getState().currentUser;

    if (user.blocked.includes(currentUser.id)) {
      this.chatId = chatId;
      this.user = null;
      this.isCurrentUserBlocked = true;
      this.isReceiverBlocked = false;
    } else if (currentUser.blocked.includes(user.id)) {
      this.chatId = chatId;
      this.user = user;
      this.isCurrentUserBlocked = false;
      this.isReceiverBlocked = true;
    } else {
      this.chatId = chatId;
      this.user = user;
      this.isCurrentUserBlocked = false;
      this.isReceiverBlocked = false;
    }
    this.notify();
  }

  changeBlock() {
    this.isReceiverBlocked = !this.isReceiverBlocked;
    this.notify();
  }

  resetChat() {
    this.chatId = null;
    this.user = null;
    this.isCurrentUserBlocked = false;
    this.isReceiverBlocked = false;
    this.notify();
  }

  getState() {
    return {
      chatId: this.chatId,
      user: this.user,
      isCurrentUserBlocked: this.isCurrentUserBlocked,
      isReceiverBlocked: this.isReceiverBlocked,
    };
  }
}

// Assuming userStore is imported or available in this scope
import { userStore } from './userStore';

export const chatStoreInstance = new ChatStore(userStore);

export const useChatStore = (selector) => {
  const [state, setState] = useState(selector(chatStoreInstance.getState()));

  useEffect(() => {
    const unsubscribe = chatStoreInstance.subscribe((newState) => {
      setState(selector(newState));
    });
    return unsubscribe;
  }, [selector]);

  return state;
};