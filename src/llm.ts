import type { AIMessage } from '../types'
import { openai, type ChatModelStr } from './ai'
import { zodFunction } from 'openai/helpers/zod'
import { z } from 'zod'
import { systemPrompt } from './systemPrompt'

export const runLLM = async ({
  model = 'gpt-4o-mini',
  messages,
  tools,
  temperature = 0.1,
}: {
  messages: AIMessage[]
  tools?: { name: string; parameters: z.AnyZodObject }[]
  temperature?: number
  model?: ChatModelStr
}) => {
  const formattedTools = tools?.map(zodFunction)
  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      ...messages,
    ],
    temperature,
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
  })
  return response.choices[0].message
}
