import Together from "together-ai";
import dotenv from "dotenv";
import fs from "fs";

// Load environment variables
if (process.env.NODE_ENV !== 'production') dotenv.config();

const together = new Together({
    apiKey: process.env.TOGETHER_API_KEY,
});

const resumeData = JSON.parse(fs.readFileSync("resume.json", "utf8"));

// 🔥 Add validation here 🔥
if (!resumeData.projects) {
    throw new Error("Resume data missing 'projects' section!");
  }
  
  // Add other critical field checks
  if (!resumeData.education) {
    throw new Error("Resume data missing 'education' section!");
  }
  
  if (!resumeData.skills) {
    throw new Error("Resume data missing 'skills' section!");
  }

// Create a reusable context prompt
export function getSystemPrompt() {
    return `
    You are a resume assistant for ${resumeData.name}. Follow these rules:
    1. ONLY use information from this JSON resume:
    ${JSON.stringify(resumeData, null, 2)}
    
    2. If asked about capabilities, respond with: 
    "I can discuss ${resumeData.name}'s ${Object.keys(resumeData).join(', ')}"
    
    3. Redirect model questions to: "I specialize in discussing ${resumeData.name}'s professional background."
    `;
}

// Test with sample query
async function testResumeQuery() {
    try {
        const response = await together.chat.completions.create({
            messages: [
                { role: "system", content: getSystemPrompt() },
                { role: "user", content: "What projects has Alok completed?" }
            ],
            model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
            temperature: 0.2,
            max_tokens: 150
        });

        console.log("Test Response:", response.choices[0].message.content);
    } catch (error) {
        console.error("API Error:", error);
    }
}

testResumeQuery();