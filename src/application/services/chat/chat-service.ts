import { Injectable } from '@nestjs/common';

import axios from 'axios';
import { IChatServiceInterface } from '@application/common/interfaces/chat/chat-service.interface';

@Injectable()
export class ChatService implements IChatServiceInterface {
  private readonly chatAppId = process.env.APP_ID;

  private readonly chatAppToken = process.env.APP_TOKEN;

  private readonly usersUrl = `https://api-${this.chatAppId}.sendbird.com/v3/users`;

  private readonly channelsUrl = `https://api-${this.chatAppId}.sendbird.com/v3/group_channels`;

  private readonly headers = {
    'Api-Token': this.chatAppToken,
    'Content-Type': 'application/json',
  };

  async createChatUser(userId: string, nickname: string, imageUrl = '') {
    return await axios.post(
      this.usersUrl,
      {
        user_id: userId,
        nickname: nickname,
        profile_url: imageUrl,
        issue_access_token: true,
      },
      {
        headers: this.headers,
      },
    );
  }

  async createChat(
    channelName: string,
    userIds: string[],
    chatId?: string,
  ): Promise<string> {
    const createdChat = await axios.post<{ channel_url: string }>(
      this.channelsUrl,
      {
        name: channelName,
        user_ids: userIds,
        channel_url: chatId,
        is_distinct: true,
      },
      {
        headers: this.headers,
      },
    );

    return createdChat.data.channel_url;
  }

  async inviteUserToChat(chatId: string, userIds: string[]) {
    return await axios.post(
      `${this.channelsUrl}/${chatId}/invite`,
      {
        user_ids: userIds,
      },
      {
        headers: this.headers,
      },
    );
  }

  async getChat(chatId: string) {
    return await axios.get(`${this.channelsUrl}/${chatId}`, {
      headers: this.headers,
    });
  }

  async getChatAccessToken(
    userId: string,
  ): Promise<{ token: string; userId: string }> {
    const response = await axios.get<{
      access_token: string;
    }>(this.usersUrl + '/' + userId, {
      headers: this.headers,
    });

    return {
      token: response.data.access_token,
      userId: userId,
    };
  }
}
