import dotenv from "dotenv";
import Together from "together-ai";
import fs from "fs";
import path from "path";

// Configuration
dotenv.config();
const __dirname = path.resolve();
const resumePath = path.join(__dirname, "netlify", "functions", "resume.json");

// Load resume data
const resumeData = JSON.parse(fs.readFileSync(resumePath, "utf8"));

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY
});

// Enhanced tuning parameters
const TUNING_CONFIG = {
  model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
  max_examples: 5,
  temperature: 0.3,
  max_tokens: 200
};

async function optimizePrompt() {
  try {
    console.log("🔧 Optimizing prompt structure...");
    
    // Example tuning prompts
    const examples = [
      {
        input: "What ML projects exist?",
        ideal: `Projects: ${resumeData.projects.map(p => p.title).join(', ')}`
      }
    ];

    // Send tuning examples
    const response = await together.chat.completions.create({
      messages: [
        { role: "system", content: "You are a resume assistant" },
        ...examples.flatMap(e => [
          { role: "user", content: e.input },
          { role: "assistant", content: e.ideal }
        ])
      ],
      ...TUNING_CONFIG
    });

    console.log("🎯 Tuning complete. Use this prompt structure:");
    console.log(response.choices[0].message.content);
    
  } catch (error) {
    console.error("⚠️ Tuning failed:", error);
  }
}

optimizePrompt();