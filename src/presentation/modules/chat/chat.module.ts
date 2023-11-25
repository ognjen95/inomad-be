import { Module } from '@nestjs/common';
import { ChatResolver } from '../../resolvers/chat/chat.resolver';
import { ChatService } from '@application/services/chat/chat-service';

@Module({
  providers: [ChatResolver, ChatService],
})
export class ChatModule {}
