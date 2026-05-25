import React, { useState, useEffect, useRef } from "react";
import { Send, Compass, Sparkles, Volume2, VolumeX, ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import { ChatMessage } from "../types";

export default function ChatSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check speech synthesis support on mount & set default welcoming message
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setSpeechSupported(true);
    }

    const defaultMsg: ChatMessage = {
      id: "welcome-ai",
      role: "model",
      content: "Greetings & welcome to the digital pavilion of New Love International Hotel. I am your dedicated AI Travel Concierge, trained deeply in Art, Gastronomy, and Lagosian explorations.\n\nAsk me about the canopy walks of Lekki Conservation Centre, private viewing hours at the Nike Art Gallery, or details about our breathable Heritage standard, Deluxe, and Penthouse Suites.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    
    setMessages([defaultMsg]);
  }, []);

  // Auto scroll chat history
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isGenerating) return;

    const userMsgId = "user-" + Date.now();
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsGenerating(true);

    try {
      // Proxy the conversational payload to our server route `/api/chat`
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to parse travel response.");
      }

      const modelMsgId = "model-" + Date.now();
      const newModelMsg: ChatMessage = {
        id: modelMsgId,
        role: "model",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, newModelMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsgId = "error-" + Date.now();
      const genericErrorMsg: ChatMessage = {
        id: errorMsgId,
        role: "model",
        content: `I apologize, but I am facing temporary contact limits right now. \n\n*Technical Details:* ${err.message || "Endpoint error"}. Please ensure your **GEMINI_API_KEY** environment variable is configured in the Secrets pane.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, genericErrorMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  // Convert text contents to synthesized Voice
  const handleToggleSpeak = (text: string) => {
    if (!speechSupported) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*#]/g, ""));
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Clickable anchor triggers
  const suggestedQueries = [
    { label: "Lekki Canopy Walk", text: "Tell me about the canopy walk at Lekki Conservation Centre. What are the rates and best times?" },
    { label: "Nike Art Gallery Details", text: "Can you recommend a premium trip to Nike Art Gallery? How is our cultural guide helping guests?" },
    { label: "Compare Suite Levels", text: "Explain the difference in elevations and prices between the Heritage Studio and Lagos Zenith Suite." },
    { label: "Local Spices & Jollof", text: "Describe standard West African jollof spice composition served at your Pan-African venue." }
  ];

  return (
    <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 max-w-6xl mx-auto px-4">
      {/* Decorative Brand Details Sidebar */}
      <section className="lg:col-span-4 bg-white/5 border border-white/5 p-6 rounded-2xl shadow-2xl backdrop-blur-md text-left flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-base font-semibold text-white">Travel Concierge Desk</h3>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Our travel concierge engine is backed by live cultural mapping of Lagos State, Nigeria. Discover recommendations that respect history, local art masters, and elite culinary spaces.
            </p>

            <div className="bg-[#131111]/90 border border-white/5 p-4 rounded-xl text-xs space-y-2">
              <strong className="font-serif text-white font-medium block mb-1">Authentic Highlights Included:</strong>
              <div className="flex items-start gap-2 text-gray-400 font-light leading-normal">
                <span className="text-[#D4AF37] mt-1">●</span>
                <span>Flora &amp; Fauna species catalog inside the Lekki Reserves.</span>
              </div>
              <div className="flex items-start gap-2 text-gray-400 font-light leading-normal">
                <span className="text-[#D4AF37] mt-1">●</span>
                <span>Curation schedules for Lagos Fashion Week and Nike gallery openings.</span>
              </div>
              <div className="flex items-start gap-2 text-gray-400 font-light leading-normal">
                <span className="text-[#D4AF37] mt-1">●</span>
                <span>Suite service bookings logged to simulate stay extensions instantly.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 mt-6 flex items-center gap-2 text-[10px] text-gray-400 font-mono uppercase tracking-wider">
          <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
          <span>Secured Server Sandbox</span>
        </div>
      </section>

      {/* Main Interactive Chat Area */}
      <section className="lg:col-span-8 bg-[#111111] border border-white/5 rounded-2xl shadow-2xl flex flex-col h-[70vh] min-h-[480px] overflow-hidden">
        {/* Chat Title Window Header */}
        <div className="bg-[#161616] border-b border-white/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-left">
              <h4 className="font-serif text-sm font-semibold text-white">Gemini Advisor Pro</h4>
              <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Online / Instant Responses</p>
            </div>
          </div>
          {speechSupported && messages.length > 0 && (
            <button
              onClick={() => handleToggleSpeak(messages[messages.length - 1].content)}
              className="text-white hover:text-[#D4AF37] transition-colors p-2 rounded-lg cursor-pointer"
              title="Speak / Stop Speech Feedback"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-[#D4AF37]" /> : <Volume2 className="w-4 h-4 text-gray-500" />}
            </button>
          )}
        </div>

        {/* Message Loop History */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#0a0a0a]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] text-left space-y-1 ${
                msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-mono">
                <span>{msg.role === "user" ? "You" : "AI Advisor"}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>
              <div
                className={`px-4 py-3 rounded-xl text-xs leading-relaxed font-sans whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-[#D4AF37] text-black font-semibold rounded-br-none"
                    : "bg-[#161616] text-white border border-white/5 rounded-bl-none font-light"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Assistant Generation Pending State */}
          {isGenerating && (
            <div className="flex flex-col max-w-[80%] text-left space-y-1 mr-auto items-start">
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-mono">
                <span>AI Advisor</span>
                <span>•</span>
                <span>Curating...</span>
              </div>
              <div className="bg-[#161616] text-white px-4 py-3 border border-white/5 rounded-xl rounded-bl-none flex items-center gap-2 text-xs">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                <span className="text-gray-400">Bespoke thoughts incoming...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested anchors section */}
        <div className="px-5 py-3.5 bg-[#0e0e0e] border-t border-b border-white/5 text-left">
          <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-2">Suggested Explorations:</span>
          <div className="flex gap-2 overflow-x-auto pb-0.5 whitespace-nowrap scrollbar-none">
            {suggestedQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q.text)}
                disabled={isGenerating}
                className="bg-[#1c1c1c] hover:bg-[#252525] border border-white/5 hover:border-[#D4AF37] text-white text-[10px] font-medium px-3 py-1.5 rounded-lg transition-all cursor-pointer disabled:opacity-50 shrink-0"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat input form */}
        <form onSubmit={handleFormSubmit} className="p-4 bg-[#121212] border-t border-white/5 flex gap-2">
          <input
            type="text"
            required
            placeholder="Ask anything about the canopy walk rates or Nike gallery curation..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isGenerating}
            className="flex-1 bg-[#181818] border border-white/10 px-4 py-3.5 rounded-xl text-xs font-sans text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] disabled:opacity-60"
          />
          <button
            id="chat-submit"
            type="submit"
            disabled={!inputValue.trim() || isGenerating}
            className="bg-[#D4AF37] hover:bg-[#F5D061] text-black font-semibold p-3.5 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-40 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </section>
    </div>
  );
}
