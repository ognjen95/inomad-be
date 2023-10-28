export interface IChatServiceInterface {
  createChatUser(userId: string, nickname: string, imageUrl?: string);
  createChat(
    channelName: string,
    userIds: string[],
    chatId?: string,
  ): Promise<string>;
  getChat(channelUrl: string);
  getChatAccessToken(userId: string);
  inviteUserToChat(chatId: string, userIds: string[]);
}
