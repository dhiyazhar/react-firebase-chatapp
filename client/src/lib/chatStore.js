class ChatStore {
  constructor(userStore) {
    this.chatId = null;
    this.user = null;
    this.isCurrentUserBlocked = false;
    this.isReceiverBlocked = false;
    this.userStore = userStore;
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
  }

  changeBlock() {
    this.isReceiverBlocked = !this.isReceiverBlocked;
  }

  resetChat() {
    this.chatId = null;
    this.user = null;
    this.isCurrentUserBlocked = false;
    this.isReceiverBlocked = false;
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

export const chatStoreInstance = new ChatStore();
export const useChatStore = () => chatStoreInstance;
