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
  async getResponse(message: string): Promise<string> {
    console.log(message)
    try {
      const Chat_Api_key = this.configService.get<string>('Chatbot_API');
      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Chat_Api_key}`,
            'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
            'X-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek/deepseek-r1-zero:free',
            messages: [
              {
                role: 'user',
                content: "message",
              },
            ],
          }),
        },
      );
      const res = await response.json();
      const aiResponse = res?.choices?.[0]?.message?.content;
      // console.log(res?.choices?.[0]?.message);
      console.log(aiResponse);

      return aiResponse || 'The server is busy right now. Care to try again?';
    } catch (error) {
      console.error('Error fetching response from OpenRouter:', error);
      throw error;
    }
  }
}
