"use client"
import React, { useEffect, useState, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send, } from "lucide-react";
import { sendToBot } from "@/server-side-actions/get-user";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const LandingComponent = () => {
  const [message, setMessage] = useState<string>("");
  const [responses, setResponses] = useState<{role: string, content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = { role: "user", content: message };
    setResponses(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);
    
    try {
      const botResponse = await sendToBot(message);
      setResponses(prev => [...prev, { role: "bot", content: botResponse }]);
    } catch (error) {
      console.log(error)
      setResponses(prev => [...prev, { 
        role: "bot", 
        content: "Sorry, I encountered an error. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [responses]);

  return (
    <div className="flex flex-col items-center justify-center h-dvh max-w-full mx-auto w-full bg-[#212121] ">
      <div className="flex-1 overflow-y-auto items-center justify-center h-full  mb-4 space-y-4 scroll-smooth ">
        <AnimatePresence >
          <div className="w-full flex flex-col gap-5 lg:w-[70%] mx-auto p-5 lg:p-10 text-md/7 leading-7 items-center justify-center">
             {responses.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center h-full w-full"
            >
              <div className="text-center space-y-4 flex items-center justify-center flex-col h-full">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white whitespace-nowrap bg-clip-text text-transparent">
                  How can I help you today?
                </h3>
              </div>
            </motion.div>
          )}

          {responses.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex w-full mx-auto  ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-2xl w-fit px-4 py-3 ${msg.role === "user" 
                  ? "bg-[#303030] text-white rounded-br-none" 
                  : "text-white rounded-bl-none"}`}
              >
                {msg.role === "bot" ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ ...props}) => (
                          <a {...props} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" />
                        ),
                        code: ({...props}) => (
                          <code {...props} className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5" />
                        ),
                        pre: ({ ...props}) => (
                          <pre {...props} className="bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto" />
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start w-full"
            >
              <div className="max-w-full bg-secondary text-secondary-foreground rounded-2xl rounded-bl-none px-4 py-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          </div>
                </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <motion.div 
        className="flex w-full mx-auto lg:w-[70%] flex-row items-center  gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Input
          className="flex-1 h-16 rounded-full px-6 bg-[#303030] p-5 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/50"
          placeholder="Type your message..."
          aria-label="Type your question here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          size="icon"
          className="h-16 w-16 rounded-full shadow-sm"
          onClick={handleSendMessage}
          disabled={isLoading || !message.trim()}
        >
          <Send className="w-10 h-10" />
        </Button>
      </motion.div>

      {/* Footer */}
      <motion.div 
        className="text-center text-xs text-muted-foreground mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.5 }}
      >
        AI can make mistakes. Consider checking important information.
      </motion.div>
    </div>
  );
};

export default LandingComponent;
