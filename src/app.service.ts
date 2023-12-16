import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { BuildMessagePayload } from './types';
import { CHART_MAKER_PROMPT, SCHEMA_MAKER_PROMPT } from './ai.config';

@Injectable()
export class AppService {
  private openAiMessageService: any;
  private openAiChartService: any;
  private systemMessage: any;
  private systemChartMessage: any;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get('gptApiKey');

    this.systemMessage = {
      role: 'system',
      content: SCHEMA_MAKER_PROMPT,
    };

    this.systemChartMessage = {
      role: 'system',
      content: CHART_MAKER_PROMPT,
    };

    this.openAiMessageService = new OpenAI({ apiKey });
    this.openAiChartService = new OpenAI({ apiKey });
  }
  async buildMessage(body: BuildMessagePayload): Promise<any> {
    const { messages } = body;

    const response = await this.openAiMessageService.chat.completions.create({
      messages: [this.systemMessage, ...messages],
      model: 'gpt-3.5-turbo',
    });

    return Promise.resolve(response.choices[0]);
  }

  async buildChart(body: BuildMessagePayload): Promise<any> {
    const { messages } = body;

    const response = await this.openAiChartService.chat.completions.create({
      messages: [this.systemChartMessage, ...messages],
      model: 'gpt-3.5-turbo-1106',
      response_format: { type: 'json_object' },
    });

    const result = response.choices[0];
    result.message.content = JSON.parse(result.message.content);

    return result;
  }
}
