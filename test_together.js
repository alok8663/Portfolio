import dotenv from "dotenv";
import Together from "together-ai";

// Load environment variables from .env
dotenv.config();

const together = new Together({
    apiKey: process.env.TOGETHER_API_KEY,  // Securely using the API key from .env
});

async function testTogetherAI() {
    const response = await together.chat.completions.create({
        messages: [{"role": "user", "content": "What are some fun things to do in New York?"}],
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    });

    console.log("AI Response:", response.choices[0].message.content);
}

testTogetherAI();
