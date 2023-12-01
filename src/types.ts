export type BuildMessagePayload = {
  messages: Array<TGPTMessage>;
};

export type TGPTMessage = {
  role: 'user' | 'system' | 'assistant';
  content: string;
};
