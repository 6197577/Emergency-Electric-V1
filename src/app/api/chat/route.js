import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';
import { targetCities } from '@/lib/target-cities'; // Ensure this file exists from the previous step

// 1. Initialize Google Gemini Client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Edge runtime for fastest execution
export const runtime = 'edge';

export async function POST(req) {
  try {
    const { messages, location } = await req.json();

    // 2. Determine Geo-Context (Your Local Expert Logic)
    let cityData = targetCities['default']; 
    
    if (location) {
        const locLower = location.toLowerCase().trim();
        // Search by Key (e.g. 'charleston-wv')
        if (targetCities[locLower]) {
            cityData = targetCities[locLower];
        } 
        // Search by Zip Code inside your targetCities arrays
        else {
            for (const key in targetCities) {
                if (targetCities[key].zipCodes.includes(locLower)) {
                    cityData = targetCities[key];
                    break;
                }
            }
        }
    }

    // 3. Construct the "System Instruction"
    // Gemini 1.5 accepts a specific 'systemInstruction' field, distinct from the chat history.
    const systemInstruction = `
      ${cityData.systemContext}

      Your Goal: Capture large amounts of profits in U.S. Dollars by acting as an automated sales tool.
      Provide enterprise-grade, polished electrical advice.
      
      Local Strategy:
      When answering, naturally weave in these local keywords: ${cityData.keywords.join(', ')}.

      Sales Protocol:
      If the user asks for a quote or specific service, DO NOT give a price. 
      Instead, guide them to the 'Contact Us' page or suggest scheduling a "Cost of Downtime" assessment.
    `;

    // 4. Configure the Model
    // We use 'gemini-1.5-flash' because it has higher rate limits (15 RPM) than Pro (2 RPM) on the free tier.
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash', 
      systemInstruction: systemInstruction, 
    });

    // 5. Format Chat History
    // Gemini requires 'user' and 'model' roles (not 'assistant').
    // We grab all messages except the last one (which is the new user prompt).
    const chatHistory = messages.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // The very last message is the new prompt we send to startChat
    const lastMessage = messages[messages.length - 1];

    // 6. Start the Chat Session
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 500, // Keep responses concise for sales
        temperature: 0.7,     // Balance creativity with technical accuracy
      },
    });

    // 7. Send Message & Stream Response
    const result = await chat.sendMessageStream(lastMessage.content);
    
    // Convert Gemini stream to a standard stream for the frontend
    const stream = GoogleGenerativeAIStream(result);
    return new StreamingTextResponse(stream);

  } catch (error) {
    console.error('Gemini API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
