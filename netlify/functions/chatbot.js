import Together from "together-ai";

export async function handler(event) {
    const together = new Together({
        apiKey: process.env.TOGETHER_API_KEY,
    });

    const body = JSON.parse(event.body);
    
    const response = await together.chat.completions.create({
        messages: [{ "role": "user", "content": body.message }],
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ reply: response.choices[0].message.content }),
    };
}
