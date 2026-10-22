import "dotenv/config";
import OpenAI from "openai";
import data from "./SampleData.json" with { type: "json" };

const client = new OpenAI({ apiKey: process.env.OPEN_AI_SECRET_KEY });

const SYSTEM_PROMPT = `You extract useful English vocabulary from transcript segments.
Return ONLY JSON in this shape:
{"items":[{"segmentId":number,"vocabulary":string,"meaning":string,"type":string,"example":string,"revisionQuestions":[string]}]}

Example item:
{"segmentId":4,"vocabulary":"resilient","meaning":"able to recover quickly from difficulties","type":"adjective","example":"She stayed resilient after the setback.","revisionQuestions":["What does 'resilient' mean?","Use 'resilient' in a sentence."]}

Rules:
- Use only the segmentIds given.
- Max one word per segment.
- Skip segments with no useful word.
- Every field must be non-empty. revisionQuestions must have at least 2 questions.`;

async function callLLM(arrayChunk) {

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: JSON.stringify(arrayChunk) },
    ],
  });

  const parsed = JSON.parse(res.choices[0].message.content);
  return parsed.items ?? [];
}

export { callLLM };