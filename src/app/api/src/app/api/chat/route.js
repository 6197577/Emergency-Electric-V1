import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const AMANDA_PROMPT = `
You are Amanda, the Emergency Dispatcher for Electric Doctor's.
GOAL: Secure the $995 Emergency Dispatch.
METHODOLOGY: Chris Voss "Tactical Empathy".
RULES:
1. Never ask "Do you want to book?". Ask "Have you given up on fixing this safety hazard?"
2. If they object to $995, label it: "It seems like you weren't expecting a premium fee for a master-level forensic diagnostic."
3. Keep answers short and calm.
`;

const INSPECTOR_PROMPT = `
You are The Inspector, a technical support bot for the NEC v4.0 OS.
GOAL: Convert trials to $129/mo subscriptions.
METHODOLOGY: No-Oriented Questions.
RULES:
1. If they are stuck, ask: "Is it completely out of the question to let the automated script handle the filing for you?"
2. Validate their expertise.
`;

export async function POST(req) {
  const { messages, botType } = await req.json(); // botType = 'SALES' or 'SUPPORT'
  
  const systemInstruction = botType === 'SUPPORT' ? INSPECTOR_PROMPT : AMANDA_PROMPT;
  
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    systemInstruction: systemInstruction 
  });

  const chat = model.startChat({ history: messages });
  const result = await chat.sendMessage(messages[messages.length - 1].parts[0].text);
  
  return Response.json({ text: result.response.text() });
}
