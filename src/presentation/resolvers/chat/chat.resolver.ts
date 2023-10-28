import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Chat } from '../../../domain/chat/chat.entity';
import { ChatService } from 'src/application/services/chat/chat-service';
import { CurrentUser } from 'src/presentation/decorators/current-user';
import { CurrentUserInfo } from 'src/presentation/resolvers/auth/types';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => Chat)
  chatAccessToken(@CurrentUser() user: CurrentUserInfo) {
    return this.chatService.getChatAccessToken(user.userId);
  }

  @Mutation(() => String)
  createChat(
    @Args('chatName', { type: () => String }) name: string,
    @Args('userIds', { type: () => [String] }) userIds: string[],
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return this.chatService.createChat(name, [currentUser.userId, ...userIds]);
  }
}
