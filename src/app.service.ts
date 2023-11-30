import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { BuildMessagePayload } from './types';

@Injectable()
export class AppService {
  private openAiService: any;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get('gptApiKey');

    this.openAiService = new OpenAI({ apiKey });
  }
  async buildMessage(body: BuildMessagePayload): Promise<any> {
    const { message } = body;

    const response = await this.openAiService.chat.completions.create({
      messages: [{ role: 'system', content: message }],
      model: 'gpt-3.5-turbo',
    });

    return Promise.resolve(response.choices[0]);
  }
}
