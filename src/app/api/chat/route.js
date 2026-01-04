
import { GoogleGenerativeAI } from '@google/generative-ai';
import { targetCities } from '@/lib/target-cities';
import { generateCheckoutLink } from '@/lib/stripe-actions';
import { supabase } from '@/lib/db';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
export const runtime = 'nodejs'; 

const tools = [{
  functionDeclarations: [{
    name: "create_service_booking",
    description: "Generate checkout link.",
    parameters: {
      type: "OBJECT",
      properties: {
        serviceType: { type: "STRING", enum: ["Residential", "Commercial"] },
        duration: { type: "NUMBER", enum: [4, 8] },
        complexity: { type: "STRING", enum: ["Standard", "High", "Critical"] },
        customerDate: { type: "STRING" },
        includeSurgeProtector: { type: "BOOLEAN" },
        joinGoldClub: { type: "BOOLEAN" },
        commercialTier: { type: "STRING", enum: ["Retail", "Industrial", "Enterprise"] }
      },
      required: ["serviceType", "duration", "complexity", "customerDate"]
    }
  }]
}];

export async function POST(req) {
  try {
    const { messages, location, siteId } = await req.json();

    // 1. Fetch Learned Strategy
    const { data: strategies } = await supabase.from('agent_strategies').select('instruction_text').eq('agent_name', 'Amanda');
    const learnedContext = strategies?.map(s => `- ${s.instruction_text}`).join("\n") || "";

    // 2. Resolve Market
    let cityData = targetCities['default']; 
    if (location) {
        const locLower = location.toLowerCase().trim();
        if (targetCities[locLower]) cityData = targetCities[locLower];
    }

    const systemInstruction = `
      ${cityData.systemContext}
      **IDENTITY:** You are Amanda, National Dispatch.
      **LEARNED STRATEGIES:**
      ${learnedContext}
      
      **PRICING:**
      1. Residential: $750 Dispatch OR **$49/mo** DIY Gold Club (Waives fee).
      2. Commercial: Sentinel IoT Program ($699 - $5,999/mo).
      
      **VISUALS:** If hazard found in image (rust, burn), FORCE 'complexity' to "Critical".
      **VOSS METHOD:** Use Labeling & Mirroring.
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', systemInstruction, tools });

    const lastMessage = messages[messages.length - 1];
    let messageParts = [{ text: lastMessage.content }];
    if (lastMessage.experimental_attachments) {
      const imageParts = lastMessage.experimental_attachments.map(att => ({
        inlineData: { data: att.url.split(',')[1], mimeType: 'image/jpeg' }
      }));
      messageParts = [...messageParts, ...imageParts];
    }

    const chat = model.startChat({ history: messages.slice(0, -1).map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })) });
    const result = await chat.sendMessage(messageParts);
    const response = result.response;
    const call = response.functionCalls()?.[0];

    // Log Async
    const transcript = messages.map(m => `${m.role}: ${m.content}`).join('\n') + `\nAmanda: ${response.text()}`;
    await supabase.from('chat_logs').insert({ agent_name: 'Amanda', transcript, outcome: call ? 'Sale' : 'InProgress' });

    if (call && call.name === 'create_service_booking') {
        const url = await generateCheckoutLink({ ...call.args, siteId, locationString: location });
        return new Response(`Secured slot for **${location}**. Local rates applied. Confirm here: ${url}`);
    }

    return new Response(response.text());
  } catch (error) {
    return new Response("System offline. Call 304-410-9208.", { status: 500 });
  }
}
