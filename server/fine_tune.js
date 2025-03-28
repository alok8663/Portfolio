import Together from "together-ai";
import dotenv from "dotenv";
import fs from "fs";

// Configure environment
if (process.env.NODE_ENV !== 'production') dotenv.config();

// Load and validate resume data
const resumeData = JSON.parse(fs.readFileSync("resume.json", "utf8"));

// Structured system prompt template
const SYSTEM_PROMPT = `
You are an expert on ${resumeData.name}'s professional profile. Use ONLY this data:

**Education:**
${resumeData.education.map(e => `- ${e.degree} at ${e.university} (${e.year}), CGPA: ${e.cgpa}`).join('\n')}

**Projects:**
${resumeData.projects.map(p => `- ${p.title}: ${p.description} [${p.technologies.join(', ')}]`).join('\n')}

**Experience:**
${resumeData.experience.map(e => `- ${e.role} at ${e.company} (${e.duration}): ${e.description}`).join('\n')}

**Skills:** ${resumeData.skills.join(', ')}

Respond ONLY about these topics. For other queries say: "I specialize in discussing ${resumeData.name}'s professional background."
`;

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

export async function handler(event) {
  const body = JSON.parse(event.body);
  
  const response = await together.chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: body.message }
    ],
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    temperature: 0.2,
    max_tokens: 200,
    top_p: 0.9
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ reply: response.choices[0].message.content }),
  };
}