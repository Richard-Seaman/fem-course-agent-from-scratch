import type { AIMessage } from '../types'
import { openai, type ChatModelStr } from './ai'

export const runLLM = async ({
  model = 'gpt-4o-mini',
  messages,
  temperature = 0.1,
}: {
  messages: AIMessage[]
  temperature?: number
  model?: ChatModelStr
}) => {
  const response = await openai.chat.completions.create({
    model,
    messages,
    temperature,
  })
  return response.choices[0].message
}
