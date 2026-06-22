import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import { TJ_PERSONA } from "@/lib/tj-persona";

// TJ.AI digital-twin chat. Streams from OpenAI (reads OPENAI_API_KEY from env).
export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai(process.env.OPENAI_MODEL ?? "gpt-4.1-mini"),
    system: TJ_PERSONA,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
