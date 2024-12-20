import OpenAI from 'openai'

export const openai = new OpenAI()

export type ChatModelStr = Parameters<
  typeof openai.chat.completions.create
>[0]['model']
