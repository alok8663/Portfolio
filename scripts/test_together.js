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

// Test cases
const TEST_CASES = [
  {
    query: "What's Alok's highest degree?",
    expected: ["MNIT Jaipur", "Mechanical Engineering"]
  },
  {
    query: "Which projects used Python?",
    expected: ["Customer Churn", "XGBoost"]
  }
];

async function runTests() {
  try {
    console.log("🧪 Starting chatbot tests...");
    
    for (const test of TEST_CASES) {
      const response = await together.chat.completions.create({
        messages: [
          { 
            role: "system", 
            content: `You are ${resumeData.name}'s assistant. Use only resume data.`
          },
          { role: "user", content: test.query }
        ],
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
        temperature: 0.1
      });

      const result = response.choices[0].message.content;
      const passed = test.expected.every(keyword => result.includes(keyword));
      
      console.log(
        `\n❓ Query: ${test.query}` +
        `\n✅ Response: ${result}` +
        `\n${passed ? "🟢 PASS" : "🔴 FAIL"}`
      );
    }
    
  } catch (error) {
    console.error("🚨 Test failed:", error);
    process.exit(1);
  }
}

runTests();