import { Module } from '@nestjs/common';
import { ChatResolver } from '../../resolvers/chat/chat.resolver';
import { ChatService } from 'src/application/services/chat/chat-service';

@Module({
  providers: [ChatResolver, ChatService],
})
export class ChatModule {}
