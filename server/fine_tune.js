import Together from "together-ai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const together = new Together({
    apiKey: process.env.TOGETHER_API_KEY,
});

const resumeData = JSON.parse(fs.readFileSync("resume.json", "utf8"));

async function fineTuneModel() {
    const structuredPrompt = `
    You are a chatbot trained on Alok Verma's resume. Answer user questions based on the following structured data:
    ${JSON.stringify(resumeData, null, 2)}
    Answer queries about experience, education, skills, and projects based on this data.
    `;

    const response = await together.chat.completions.create({
        messages: [{ "role": "system", "content": structuredPrompt }],
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    });

    console.log("Fine-Tuning Completed:", response);
}

fineTuneModel();
