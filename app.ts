import "dotenv/config";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const model = google("gemini-2.0-flash-001");

const { textStream } = streamText({
  model,
  prompt: `Summarise the plot of 'As a Reincarnated Aristocrat, I'll Use My Appraisal Skill to Rise in the World' up to (but not including) Season 2, Episode 1. Include the main characters and the main events. 
    
    Your job is to help me catch up to the latest episode after a long time since I've last watched the series.
    
    Format the response for an ANSI output stream.`,
});

for await (const textPart of textStream) {
  process.stdout.write(textPart);
}
