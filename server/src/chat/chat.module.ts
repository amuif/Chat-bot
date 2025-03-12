import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [ChatService, DatabaseService],
  controllers: [ChatController],
  exports: [ChatModule],
})
export class ChatModule { }
