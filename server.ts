import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

// Lazy initialization of Gemini API Client with proper user-agent headers
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required to run AI features. Please provide it in the Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Health probe
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// API: Server-side Gemini chat proxy
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Missing message query parameter" });
    }

    const ai = getGeminiClient();

    // Prepare systemic instruction for Lagos boutique hotel persona
    const systemInstruction = 
      "You are the warm, highly sophisticated AI Travel Concierge of the New Love International Hotel Ltd. " +
      "located in Lagos, Nigeria. Your persona is refined, respectful, culturally knowledgeable, and deeply passionate " +
      "about Modern West African luxury, design, art, culinary expeditions, and wellness. " +
      "Provide premium, helpful recommendations regarding the hotel's amenities (such as the Heritage Studio on the " +
      "Ground Floor for ₦185,000/night, the biophilic Sky Garden Room on the Mid-Level for ₦320,000/night, " +
      "and the breathtaking Penthouse Lagos Zenith Suite for ₦750,000/night). " +
      "Give exquisite travel recommendations for Lagos: exploring the tree canopy walks of the Lekki Conservation Centre, " +
      "admiring modern art at the Nike Art Gallery, theater and meals at Terra Kulture, premium beach views at Landmark beach, " +
      "or dining on our gourmet Pan-African culinary concepts. " +
      "Be refined, expressive, warm, and structured with clean formatting in your responses. Keep responses under 220 words.";

    // Adapt messages list for standard api format
    const formattedContents = [];
    if (messages && Array.isArray(messages)) {
      for (const msg of messages) {
        formattedContents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        });
      }
    }
    
    // Add original current message
    formattedContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I apologize, but I couldn't generate a suggestion at this moment. How else can I assist you with your Lagos stay?";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: error.message || "An error occurred while contacting the AI Concierge.",
      details: "Ensure GEMINI_API_KEY is configured correctly under Secrets."
    });
  }
});

// Serve frontend assets
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // In development, hook up the Vite Dev Server as a middleware
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve absolute static path to the webapp build
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`New Love International hotel backend running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
