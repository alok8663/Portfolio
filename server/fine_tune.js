import Together from "together-ai";
import fs from "fs";

// Load resume data once
const resumeData = JSON.parse(fs.readFileSync("./resume.json", "utf8"));

// Strict system prompt
const SYSTEM_PROMPT = `
You are ${resumeData.name}'s career assistant. Use ONLY this data:

EDUCATION:
${resumeData.education.map(e => `${e.degree} at ${e.university} (${e.year}), CGPA: ${e.cgpa}`).join('\n')}

PROJECTS:
${resumeData.projects.map(p => `${p.title}: ${p.description} [${p.technologies.join(', ')}]`).join('\n')}

Respond ONLY about these topics. For other queries say: "I specialize in discussing ${resumeData.name}'s professional background."
`;

export async function handler(event) {
  const together = new Together({
    apiKey: process.env.TOGETHER_API_KEY
  });

  const { message } = JSON.parse(event.body);
  
  const response = await together.chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: message }
    ],
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    temperature: 0.1,  // Strict adherence to context
    max_tokens: 250
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ reply: response.choices[0].message.content })
  };
}