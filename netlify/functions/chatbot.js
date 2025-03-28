import Together from "together-ai";
import fs from "fs";
import path from "path";

// Configure environment
const __dirname = path.resolve();
const resumePath = path.join(__dirname, "netlify", "functions", "resume.json");

// Load and validate resume data
const resumeData = (() => {
  try {
    const data = JSON.parse(fs.readFileSync(resumePath, "utf8"));
    if (!data.projects || !data.education) {
      throw new Error("Resume missing required sections");
    }
    return data;
  } catch (error) {
    console.error("🚨 Resume load error:", error);
    process.exit(1);
  }
})();

// System prompt template
const SYSTEM_PROMPT = `
You are ${resumeData.name}'s professional assistant. Strict rules:
1. Use ONLY this data:
EDUCATION:
${resumeData.education.map(e => `- ${e.degree} @ ${e.university} (${e.year})`).join('\n')}

PROJECTS:
${resumeData.projects.map(p => `- ${p.title}: ${p.description} [${p.technologies.join(', ')}]`).join('\n')}

2. Never mention being an AI
3. Redirect off-topic questions to: "Ask about ${resumeData.name}'s experience!"
`.trim();

const together = new Together({ 
  apiKey: process.env.TOGETHER_API_KEY 
});

export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body);
    
    const response = await together.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      temperature: 0.2,
      max_tokens: 150,
      top_p: 0.9
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply: response.choices[0].message.content })
    };

  } catch (error) {
    console.error("💥 Handler error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process request" })
    };
  }
}