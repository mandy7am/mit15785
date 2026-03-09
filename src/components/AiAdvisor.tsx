import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Paperclip, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const QUICK_CHIPS = [
  "What are the prerequisites for AI in Healthcare?",
  "Compare Professor ratings for 15.810 vs 15.060.",
  "Does this schedule meet my Healthcare Transformation focus?",
];

const AiAdvisor = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);

    try {
      // Placeholder: POST to AI backend
      // Replace the URL with your actual backend endpoint
      const response = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error("Backend not available");
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: data.content || data.message },
      ]);
    } catch {
      // Fallback demo response
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I'm your **Sloan Compass AI** advisor, specializing in Clinical Informatics & Management. I'd be happy to help with that query! *(Connect your AI backend to get real responses.)*",
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <>
      {/* Floating bubble */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
            style={{ backgroundColor: "hsl(var(--deep-forest))" }}
            aria-label="Open AI Advisor"
          >
            <MessageCircle className="w-6 h-6" style={{ color: "hsl(var(--deep-forest-foreground))" }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-[60] w-[380px] max-h-[560px] flex flex-col rounded-2xl shadow-2xl border border-border/40 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{ backgroundColor: "hsl(var(--deep-forest))" }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" style={{ color: "hsl(var(--deep-forest-foreground))" }} />
                <span className="font-display text-sm font-semibold" style={{ color: "hsl(var(--deep-forest-foreground))" }}>
                  Sloan Compass AI
                </span>
                <span className="flex items-center gap-1 ml-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] text-green-300 font-medium">Live</span>
                </span>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
              {messages.length === 0 && !thinking && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground text-center">
                    Clinical Informatics & Management Advisor
                  </p>
                  <div className="space-y-2">
                    {QUICK_CHIPS.map((chip) => (
                      <button
                        key={chip}
                        onClick={() => sendMessage(chip)}
                        className="w-full text-left text-xs px-3 py-2 rounded-lg border border-border bg-card hover:bg-accent transition-colors text-foreground"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "text-white"
                        : "bg-white text-foreground shadow-sm border border-border/30"
                    }`}
                    style={msg.role === "user" ? { backgroundColor: "hsl(var(--deep-forest))" } : undefined}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm prose-neutral max-w-none [&>p]:m-0">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {thinking && (
                <div className="flex justify-start">
                  <div className="bg-white shadow-sm border border-border/30 rounded-xl px-4 py-2.5 flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: "hsl(var(--deep-forest))",
                          animationDelay: `${i * 150}ms`,
                          animationDuration: "0.8s",
                        }}
                      />
                    ))}
                    <span className="text-[10px] text-muted-foreground ml-2">AI is thinking…</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="shrink-0 border-t border-border/40 px-3 py-2 bg-white/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex items-center gap-2"
              >
                <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.csv,.xlsx" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  title="Upload degree audit"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask your advisor..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || thinking}
                  className="w-8 h-8 rounded-full shrink-0"
                  style={{ backgroundColor: "hsl(var(--deep-forest))" }}
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiAdvisor;
