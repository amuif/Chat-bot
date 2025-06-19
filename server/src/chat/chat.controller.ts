import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }
  @Post()
  async sendMessage(@Body() message: string) {
    return this.chatService.getResponse(message);
  }
}
