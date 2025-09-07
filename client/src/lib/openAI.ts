import OpenAI from "openai"

const client = new OpenAI({
    apiKey: localStorage.getItem("key") || undefined
});

const response = await client.responses.create({
    model: "gpt-4.1-nano",
    input: "Say Hello"
});

console.log(response?.output_text)