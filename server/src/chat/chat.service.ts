import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import axios from 'axios';
import { ConfigChangeEvent, ConfigService } from '@nestjs/config';

@Injectable()
export class ChatService {
  constructor(
    private readonly databaseModule: DatabaseService,
    private readonly configService: ConfigService,
  ) {}
  async getResponse(input: { message: string } | string): Promise<string> {
    // Handle both formats:
    const message = typeof input === 'string' ? input : input.message;
    console.log(message);
    try {
      const Chat_Api_key = this.configService.get<string>('Chatbot_API');
      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Chat_Api_key}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek/deepseek-chat-v3-0324:free',
            messages: [
              {
                role: 'user',
                content: message,
              },
            ],
          }),
        },
      );
      const res = await response.json();
      console.log(res);
      const aiResponse = res?.choices?.[0]?.message;
      // console.log(res?.choices?.[0]?.message);
      // console.log(aiResponse);

      return aiResponse || 'The server is busy right now. Care to try again?';
    } catch (error) {
      console.error('Error fetching response from OpenRouter:', error);
      throw error;
    }
  }
}
